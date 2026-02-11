# AWS CloudFormation

## Overview
CloudFormation is AWS's native IaC service for provisioning and managing AWS resources declaratively using JSON or YAML templates. Stacks are the unit of deployment — create, update, or delete all resources as a single unit.

## Template Structure
```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: "My application stack"

Parameters:
  Environment:
    Type: String
    Default: dev
    AllowedValues: [dev, staging, prod]

  InstanceType:
    Type: String
    Default: t3.micro

Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      ImageId: ami-0abcdef1234567890
      Tags:
        - Key: Environment
          Value: !Ref Environment

  WebBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "${AWS::StackName}-assets-${Environment}"

Outputs:
  InstanceId:
    Value: !Ref WebServer
    Export:
      Name: !Sub "${AWS::StackName}-InstanceId"

  BucketArn:
    Value: !GetAtt WebBucket.Arn
```

## Key Intrinsic Functions
| Function | Usage |
|----------|-------|
| `!Ref` | Reference a parameter or resource |
| `!Sub` | String substitution with variables |
| `!GetAtt` | Get an attribute of a resource |
| `!Join` | Join strings with a delimiter |
| `!Select` | Select from a list by index |
| `!If` | Conditional value |
| `!ImportValue` | Import from another stack's outputs |

## Stack Operations
```bash
# Create a stack
aws cloudformation create-stack \
  --stack-name my-app \
  --template-body file://template.yaml \
  --parameters ParameterKey=Environment,ParameterValue=prod

# Preview changes
aws cloudformation create-change-set \
  --stack-name my-app \
  --change-set-name my-changes \
  --template-body file://template.yaml

# Update a stack
aws cloudformation update-stack \
  --stack-name my-app \
  --template-body file://template.yaml

# Delete a stack
aws cloudformation delete-stack --stack-name my-app
```

## Nested Stacks
Break large templates into reusable components:
```yaml
Resources:
  NetworkStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/my-bucket/network.yaml
      Parameters:
        VpcCidr: "10.0.0.0/16"

  AppStack:
    Type: AWS::CloudFormation::Stack
    DependsOn: NetworkStack
    Properties:
      TemplateURL: https://s3.amazonaws.com/my-bucket/app.yaml
      Parameters:
        VpcId: !GetAtt NetworkStack.Outputs.VpcId
```

## Best Practices
- Always use change sets to preview updates before applying.
- Use parameters and conditions to make templates reusable across environments.
- Enable termination protection on production stacks.
- Use `DependsOn` only when CloudFormation can't infer dependencies automatically.
- Export outputs for cross-stack references instead of hardcoding values.
- Use `DeletionPolicy: Retain` on stateful resources (databases, S3 buckets).
- Validate templates before deploying: `aws cloudformation validate-template`.
