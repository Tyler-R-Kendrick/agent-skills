# DynamicData

## Overview

DynamicData is a reactive collections library built on top of Reactive Extensions (Rx). It provides `SourceCache<TObject, TKey>` and `SourceList<T>` as mutable data sources, and a rich set of LINQ-style operators (`Filter`, `Sort`, `Transform`, `Group`, `Bind`) that produce observable change sets. When items are added, removed, or updated in the source, operators propagate only the changes (not the entire collection) downstream, making UI binding highly efficient.

DynamicData is commonly used with ReactiveUI for MVVM applications in WPF, MAUI, Avalonia, and Blazor, but it works independently of any UI framework.

## Installation

```bash
dotnet add package DynamicData
```

## SourceCache: Keyed Collections

`SourceCache<TObject, TKey>` manages a collection of items identified by a unique key. All modifications go through the cache, and downstream operators receive granular change sets.

```csharp
using System;
using System.Reactive.Disposables;
using System.Reactive.Linq;
using DynamicData;
using DynamicData.Binding;

namespace MyApp.ViewModels;

public record Employee(int Id, string Name, string Department, decimal Salary, bool IsActive);

public class EmployeeListViewModel : IDisposable
{
    private readonly SourceCache<Employee, int> _cache;
    private readonly CompositeDisposable _disposables = new();

    public IObservableCollection<EmployeeViewModel> ActiveEmployees { get; }
    public IObservableCollection<EmployeeViewModel> AllEmployees { get; }

    public EmployeeListViewModel()
    {
        _cache = new SourceCache<Employee, int>(e => e.Id);

        // Filter to active employees, transform to view models, sort, and bind
        ActiveEmployees = new ObservableCollectionExtended<EmployeeViewModel>();
        _cache.Connect()
            .Filter(e => e.IsActive)
            .Transform(e => new EmployeeViewModel(e))
            .Sort(SortExpressionComparer<EmployeeViewModel>
                .Ascending(vm => vm.Name))
            .ObserveOn(RxApp.MainThreadScheduler)
            .Bind((IObservableCollection<EmployeeViewModel>)ActiveEmployees)
            .Subscribe()
            .DisposeWith(_disposables);

        // All employees without filter
        AllEmployees = new ObservableCollectionExtended<EmployeeViewModel>();
        _cache.Connect()
            .Transform(e => new EmployeeViewModel(e))
            .Sort(SortExpressionComparer<EmployeeViewModel>
                .Ascending(vm => vm.Department)
                .ThenByAscending(vm => vm.Name))
            .ObserveOn(RxApp.MainThreadScheduler)
            .Bind((IObservableCollection<EmployeeViewModel>)AllEmployees)
            .Subscribe()
            .DisposeWith(_disposables);
    }

    public void AddEmployee(Employee employee) =>
        _cache.AddOrUpdate(employee);

    public void RemoveEmployee(int id) =>
        _cache.RemoveKey(id);

    public void BulkLoad(IEnumerable<Employee> employees) =>
        _cache.Edit(innerCache =>
        {
            innerCache.Clear();
            innerCache.AddOrUpdate(employees);
        });

    public void Dispose() => _disposables.Dispose();
}

public record EmployeeViewModel(Employee Employee)
{
    public string Name => Employee.Name;
    public string Department => Employee.Department;
    public decimal Salary => Employee.Salary;
}
```

## SourceList: Ordered Collections

`SourceList<T>` is for collections where items do not have a natural key and ordering matters.

```csharp
using System;
using System.Reactive.Disposables;
using DynamicData;
using DynamicData.Binding;

namespace MyApp.ViewModels;

public record LogEntry(DateTime Timestamp, string Level, string Message);

public class LogViewerViewModel : IDisposable
{
    private readonly SourceList<LogEntry> _logs = new();
    private readonly CompositeDisposable _disposables = new();

    public IObservableCollection<LogEntry> FilteredLogs { get; }

    public LogViewerViewModel(string levelFilter = "Error")
    {
        FilteredLogs = new ObservableCollectionExtended<LogEntry>();

        _logs.Connect()
            .Filter(log => log.Level == levelFilter)
            .Sort(SortExpressionComparer<LogEntry>
                .Descending(l => l.Timestamp))
            .Top(100)  // Keep only the 100 most recent
            .Bind((IObservableCollection<LogEntry>)FilteredLogs)
            .Subscribe()
            .DisposeWith(_disposables);
    }

    public void AddLog(LogEntry entry) => _logs.Add(entry);

    public void Clear() => _logs.Clear();

    public void Dispose() => _disposables.Dispose();
}
```

## Reactive Filtering with Dynamic Predicates

Filters can react to changing predicates using `IObservable<Func<T, bool>>`.

```csharp
using System;
using System.Reactive.Disposables;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using DynamicData;
using DynamicData.Binding;

namespace MyApp.ViewModels;

public record Product(int Id, string Name, string Category, decimal Price);

public class ProductSearchViewModel : IDisposable
{
    private readonly SourceCache<Product, int> _cache;
    private readonly BehaviorSubject<string> _searchTerm = new(string.Empty);
    private readonly BehaviorSubject<string> _categoryFilter = new("All");
    private readonly CompositeDisposable _disposables = new();

    public IObservableCollection<Product> Results { get; }

    public string SearchTerm
    {
        get => _searchTerm.Value;
        set => _searchTerm.OnNext(value);
    }

    public string CategoryFilter
    {
        get => _categoryFilter.Value;
        set => _categoryFilter.OnNext(value);
    }

    public ProductSearchViewModel()
    {
        _cache = new SourceCache<Product, int>(p => p.Id);
        Results = new ObservableCollectionExtended<Product>();

        // Combine search term and category filter into a dynamic predicate
        var dynamicFilter = _searchTerm
            .Throttle(TimeSpan.FromMilliseconds(300))
            .CombineLatest(_categoryFilter, (search, category) =>
            {
                return new Func<Product, bool>(product =>
                {
                    bool matchesSearch = string.IsNullOrEmpty(search) ||
                        product.Name.Contains(search, StringComparison.OrdinalIgnoreCase);
                    bool matchesCategory = category == "All" ||
                        product.Category == category;
                    return matchesSearch && matchesCategory;
                });
            });

        _cache.Connect()
            .Filter(dynamicFilter)
            .Sort(SortExpressionComparer<Product>.Ascending(p => p.Name))
            .Bind((IObservableCollection<Product>)Results)
            .Subscribe()
            .DisposeWith(_disposables);
    }

    public void LoadProducts(IEnumerable<Product> products) =>
        _cache.AddOrUpdate(products);

    public void Dispose()
    {
        _searchTerm.Dispose();
        _categoryFilter.Dispose();
        _disposables.Dispose();
    }
}
```

## Grouping

```csharp
using System;
using System.Reactive.Disposables;
using DynamicData;
using DynamicData.Binding;

namespace MyApp.ViewModels;

public class GroupedEmployeeViewModel : IDisposable
{
    private readonly SourceCache<Employee, int> _cache;
    private readonly CompositeDisposable _disposables = new();

    public IObservableCollection<IGroup<Employee, int, string>> Departments { get; }

    public GroupedEmployeeViewModel()
    {
        _cache = new SourceCache<Employee, int>(e => e.Id);
        Departments = new ObservableCollectionExtended<IGroup<Employee, int, string>>();

        _cache.Connect()
            .Group(e => e.Department)
            .Bind((IObservableCollection<IGroup<Employee, int, string>>)Departments)
            .Subscribe()
            .DisposeWith(_disposables);
    }

    public void Dispose() => _disposables.Dispose();
}
```

## Key Operators Reference

| Operator               | Source Type    | Purpose                                           |
|------------------------|---------------|---------------------------------------------------|
| `Filter`               | Cache / List  | Include items matching a predicate                |
| `Transform`            | Cache / List  | Project each item to a new type                   |
| `Sort`                 | Cache / List  | Order items by one or more expressions            |
| `Bind`                 | Cache / List  | Bind change set to an `IObservableCollection`     |
| `Group`                | Cache         | Group items by a key selector                     |
| `Top`                  | Cache / List  | Take the first N items after sorting              |
| `DistinctValues`       | Cache         | Extract distinct values of a property             |
| `MergeMany`            | Cache         | Merge observables from each item into one stream  |
| `AutoRefresh`          | Cache         | Re-evaluate operators when a property changes     |
| `TransformMany`        | Cache         | Flatten one-to-many relationships                 |
| `Except`               | Cache         | Items in source but not in another cache          |
| `And` / `Or`           | Cache         | Set operations between two caches                 |

## Best Practices

1. **Use `SourceCache<TObject, TKey>` for collections with a natural unique key (database IDs, GUIDs)** and `SourceList<T>` for ordered collections without keys, because the cache provides O(1) lookup and deduplication.

2. **Call `.DisposeWith(disposables)` on every subscription and dispose the `CompositeDisposable` in the view model's `Dispose` method** to prevent memory leaks from long-lived subscriptions that hold references to the source cache.

3. **Use `cache.Edit(innerCache => { ... })` for bulk mutations** to batch multiple adds, removes, and updates into a single change set notification, preventing N separate UI updates when loading N items.

4. **Apply `ObserveOn(RxApp.MainThreadScheduler)` before `.Bind()`** to marshal change set notifications to the UI thread; binding on a background thread causes cross-thread access exceptions in WPF, MAUI, and WinUI.

5. **Use `SortExpressionComparer<T>.Ascending(x => x.Property)` instead of custom `IComparer<T>` implementations** because the expression-based comparer integrates with DynamicData's change-tracking and produces correct incremental sort updates.

6. **Use `AutoRefresh(e => e.PropertyName)` when items implement `INotifyPropertyChanged` and a filter or sort depends on a mutable property** so that the operator re-evaluates when the property changes, not only when items are added or removed.

7. **Throttle dynamic filter predicates with `.Throttle(TimeSpan.FromMilliseconds(300))`** when the predicate changes on every keystroke (search boxes) to avoid re-filtering the entire cache on every character typed.

8. **Prefer `Transform` over `Select`** because `Transform` produces a change set that tracks the relationship between source and transformed items, enabling efficient removal of transformed items when the source item is removed.

9. **Use `DistinctValues(e => e.Category)` to extract unique property values for filter dropdowns** rather than manually tracking categories, so the dropdown automatically updates when items with new categories are added.

10. **Keep the `SourceCache` as a private field in the view model and expose only `IObservableCollection<T>` to the view** to enforce unidirectional data flow where mutations go through view model methods and the UI only reads the bound collection.
