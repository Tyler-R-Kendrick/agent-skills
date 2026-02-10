---
description: Guidance for Command Query Separation (CQS) pattern.
metadata:
  displayName: Command Query
---

# Command Query

## Overview
Command Query Separation (CQS) separates operations that change state (commands) from operations that return data (queries).

## Example
```csharp
// Query
public class GetUserQuery : IQuery<UserDto>
{
    public int UserId { get; set; }
}

public class GetUserQueryHandler : IQueryHandler<GetUserQuery, UserDto>
{
    public async Task<UserDto> Handle(GetUserQuery query)
    {
        return await _db.Users.FindAsync(query.UserId);
    }
}

// Command
public class CreateUserCommand : ICommand
{
    public string Email { get; set; }
}

public class CreateUserCommandHandler : ICommandHandler<CreateUserCommand>
{
    public async Task Handle(CreateUserCommand command)
    {
        await _db.Users.AddAsync(new User { Email = command.Email });
        await _db.SaveChangesAsync();
    }
}
```

## Best Practices
- Commands return void or result status
- Queries never modify state
- Use separate models for reads and writes
