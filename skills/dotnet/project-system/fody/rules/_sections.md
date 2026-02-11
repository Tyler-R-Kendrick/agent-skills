# Fody Rules

Best practices and rules for Fody.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | List weavers in `FodyWeavers.xml` in the order they should execute | MEDIUM | [`fody-list-weavers-in-fodyweavers-xml-in-the-order-they-should.md`](fody-list-weavers-in-fodyweavers-xml-in-the-order-they-should.md) |
| 2 | Commit `FodyWeavers.xml` and `FodyWeavers.xsd` to version control | MEDIUM | [`fody-commit-fodyweavers-xml-and-fodyweavers-xsd-to-version.md`](fody-commit-fodyweavers-xml-and-fodyweavers-xsd-to-version.md) |
| 3 | Verify woven behavior by decompiling the output assembly with ILSpy or dotnet-ilverify | MEDIUM | [`fody-verify-woven-behavior-by-decompiling-the-output-assembly.md`](fody-verify-woven-behavior-by-decompiling-the-output-assembly.md) |
| 4 | Use nullable annotations (`string?`) to control NullGuard behavior | MEDIUM | [`fody-use-nullable-annotations-string-to-control-nullguard.md`](fody-use-nullable-annotations-string-to-control-nullguard.md) |
| 5 | Prefer PropertyChanged.Fody over manual `INotifyPropertyChanged` implementation in MVVM projects | CRITICAL | [`fody-prefer-propertychanged-fody-over-manual.md`](fody-prefer-propertychanged-fody-over-manual.md) |
| 6 | Pin Fody and add-in package versions in `Directory.Packages.props` | HIGH | [`fody-pin-fody-and-add-in-package-versions-in-directory-packages.md`](fody-pin-fody-and-add-in-package-versions-in-directory-packages.md) |
| 7 | Do not use Fody for concerns that source generators can handle transparently | CRITICAL | [`fody-do-not-use-fody-for-concerns-that-source-generators-can.md`](fody-do-not-use-fody-for-concerns-that-source-generators-can.md) |
| 8 | Set `IncludeDebugAssert="false"` on NullGuard in production builds | CRITICAL | [`fody-set-includedebugassert-false-on-nullguard-in-production.md`](fody-set-includedebugassert-false-on-nullguard-in-production.md) |
| 9 | Measure build-time impact when adding multiple weavers | MEDIUM | [`fody-measure-build-time-impact-when-adding-multiple-weavers.md`](fody-measure-build-time-impact-when-adding-multiple-weavers.md) |
| 10 | Exclude generated or third-party code from weaving using `[DoNotNotify]`, `[NullGuardIgnore]`, or assembly-level attributes | CRITICAL | [`fody-exclude-generated-or-third-party-code-from-weaving-using.md`](fody-exclude-generated-or-third-party-code-from-weaving-using.md) |
