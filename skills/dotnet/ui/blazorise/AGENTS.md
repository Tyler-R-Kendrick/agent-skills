# Blazorise

## Overview
Blazorise is a component library for Blazor with support for multiple CSS frameworks (Bootstrap, Material, etc.).

## Example
```razor
@using Blazorise

<Card>
    <CardHeader>
        <CardTitle>User Profile</CardTitle>
    </CardHeader>
    <CardBody>
        <Field>
            <FieldLabel>Name</FieldLabel>
            <TextEdit @bind-Text="@name" />
        </Field>
        <Field>
            <FieldLabel>Email</FieldLabel>
            <TextEdit @bind-Text="@email" Role="TextRole.Email" />
        </Field>
    </CardBody>
    <CardFooter>
        <Button Color="Color.Primary" Clicked="@SaveUser">Save</Button>
    </CardFooter>
</Card>

@code {
    string name;
    string email;
    
    void SaveUser() { /* ... */ }
}
```

## Best Practices
- Choose appropriate CSS provider
- Use built-in validation
- Leverage datagrid for tables
- Follow component patterns
