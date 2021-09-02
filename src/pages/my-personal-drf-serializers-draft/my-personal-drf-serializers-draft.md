---
title: "My personal django rest framework serializer notes"
tags: ["django", "apis", "notes"]
date: "2021-08-26"
spoiler: "A use case driven draft, UDD 🤔 !!"
---

Before today it was only me and god who can read my hand writing, but today it is only god who can... today I got stuck reading one of my DRF drafts about `serializers` and decided that it's that time of the year again where I start thinking that I should have a blog where I can save my notes -then forget about it again-, but as I already got a blog I said why not 🤔 ? ... let's create a digital copy of my drf serializer notes, maybe someone will find it useful.

> save time creating django apis with [this cool django package](https://github.com/Abdenasser/dr_scaffold), and support the repository by dropping a star ⭐

<hr>

Let's define an Index or a table of content that we can use as reference in the future.

## Table of content

```
1 - Fields
  --------------------------
  - Serializer Method Field
  - Read Only Field
  - Custom Field Validation
  - Using Multiple Serializers
  --------------------------
2 - Data
  --------------------------
  - Custom Data Validation
  - Custom Output with `to_representation`()
  - Custom Input with `to_internal_value`().
  - Pass additional data directly to `save()`
  --------------------------
3 - Keywords
  --------------------------
  - The `source` Keyword
  - The `context` Keyword
```

<br>
<hr>

## 1- Fields

### Serializer Method Field

This is a read-only field. It gets its value by calling a method on the serializer class it is attached to. It can be used to add any sort of data to the serialized representation of your object.

`SerializerMethodField` gets its data by calling `get_<field_name>`.

Example:

```python
class UserSerializer(serializers.ModelSerializer):
    days_since_joined = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def get_days_since_joined(self, obj):
        return (now() - obj.date_joined).days
```

### Read Only Field

Read-only fields are included in the API output, but should not be included in the input during create or update operations. Any `read_only` fields that are incorrectly included in the serializer input will be ignored.

Example:

```python
class AccountSerializer(serializers.Serializer):
    id = IntegerField(label='ID', read_only=True)
```

### Custom Field Validation

Validation in Django REST framework serializers is handled a little differently to how validation works in Django's ModelForm class.

With ModelForm the validation is performed partially on the form, and partially on the model instance. With REST framework the validation is performed entirely on the serializer class.

Let's take an example where we want to only allow students that have age between 12 and 18:

```python
class StudentSerializer(serializers.ModelSerializer):
    ...
    def validate_age(self, age):
        if age > 18 or age < 12:
            raise serializers.ValidationError('Age has to be between 12 and 18.')
        return age
```

### Using Multiple Serializers

You can override the `get_serializer_class()` of your `ViewSet` when for example you want to use a different Serializer in your create and update actions like the following:

```python
class MyViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()

    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            return WriteSerializer
        return ReadSerializer
```

<br>
<hr>

## 2- Data

### Custom Data Validation

Besides **Custom Field Validation**, there are two additional ways we can use to validate our data, when for example we need to compare some of our fields between each other the best way to do that is on the object level.

example:

```python
class OrderSerializer(serializers.ModelSerializer):
    ...
    def validate(self, data):
        if data['discount_amount'] > data['total_amount']:
            raise serializers.ValidationError('discount cannot be bigger than the total amount')
        return data
```

Another good way to do validation is when a validation logic is repeated multiple times in some serializers, you can then extract it to a function, example:

```python
def is_valid_age(value):
    if age < 12:
        raise serializers.ValidationError('age cannot be lower than 12.')
    elif age > 18:
        raise serializers.ValidationError('age cannot be higher than 18')
```

Then you can pass it like this in the other serializers:

```python
class AnotherSerializer(serializers.ModelSerializer):
    age = IntegerField(validators=[is_valid_age])
```

### Custom Output with `to_representation()`

When you want to customize the output right before it is sent use `to_representation()`, imagine you have an output like the following after serialization is completed:

```json
{
  "id": 1,
  "username": "abdenasser",
  "bio": "Hey ... you already know!",
  "followed_by": [2, 3]
}
```

and you want to add a total followers count to it... you can simply do:

```python
class ResourceSerializer(serializers.ModelSerializer):
    ...
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['followers'] = instance.followed_by.count()
        return representation
```

Then you'll get:

```json
{
  "id": 1,
  "username": "abdenasser",
  "bio": "Hey ... you already know!",
  "followed_by": [2, 3],
  "followers": 2
}
```

### Custom Input with `to_internal_value()`

Let's say that your API is expecting some input from a 3rd party service and you are only interested in a chunk of that input, you can use `to_internal_value()` as follow:

```python
class SomeSerializer(serializers.ModelSerializer):
    ...
    def to_internal_value(self, data):
        useful_data = data['useful']
        return super().to_internal_value(useful_data)
```

### Pass additional data directly to save()

Calling `.save()` will either create a new instance, or update an existing instance, depending on if an existing instance was passed when instantiating the serializer class:

```python
# .save() will create a new instance.
serializer = CommentSerializer(data=data)

# .save() will update the existing `comment` instance.
serializer = CommentSerializer(comment, data=data)
```

<br>
<hr>

## 3- Keywords

### The source Keyword

In essence, you can use `source` in a field like this

```python
field_name = serializers.SomeFieldType(source='prop')
```

where `prop` could be a call for a function that return some value, or a property that exists in a related model like `...(source='author.bio')` or even a serializer field that you want to rename in output.

You can also attach the whole object with `source='*'` if you need.

### The context Keyword

You can provide arbitrary additional context by passing a context argument when instantiating a serializer. For example:

```python
resource = Resource.objects.get(id=1)
serializer = ResourceSerializer(resource, context={'key': 'value'})
```

The context dictionary can then be used within any serializer field logic, such as a custom .to_representation() method, by accessing the self.context attribute.

```python
def to_representation(self, instance):
    representation = super().to_representation(instance)
    representation['key'] = self.context['key']

    return representation
```

<br>

## Final word:

Django Rest Framework has a very good documentation which you can find and read [here](https://www.django-rest-framework.org/), try to spend some time on it and use it as a fall back any time you feel that things started getting complicated in your serializers, also bare in mind that while you are using serializers you are most of the time using, overriding or extending the base serializer functionalities so go check it out and take a look at it [here](https://github.com/encode/django-rest-framework/blob/master/rest_framework/serializers.py).
