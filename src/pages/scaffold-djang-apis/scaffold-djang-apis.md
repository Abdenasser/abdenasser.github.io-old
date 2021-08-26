---
title: "Scaffold django apis like a champion"
tags: ["django", "python", "oss"]
date: "2021-08-26"
spoiler: "The very first blog post"
---

![scaffold django api application with command line](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/68vl7f0fy7bbhtym2akf.png)

Hey 👋 my name is Abdenasser I'm the creator of this little django scaffold generator https://github.com/Abdenasser/dr_scaffold and today I'm gonna show you how to use it to create ready to use and fully functional REST apis with django only using the command line, let's get started.

Setting a django environement is outside of the scope of this article, I'm sure there's a lot of guides and tutorials on how to do that all over internet you can follow one of them and get back, we'll be waiting just right here!

In a nutshell here is what we gonna do in three steps:

1. Create a django project
2. Setup djangorestframework and dr_scaffold
3. Scaffold a blog api with Articles and Authors

# 1. Create a django project:

- Le't create a django project using this django-admin command:

```bash
$ django-admin startproject myApi
```

> this command does the same as `python manage.py startproject myApi`

- Let's then cd to our newly created django project `cd myApi` and create a virtualenv with:

```bash
$ python3 -m virtualenv env
```

- Finally let's activate our virtual env with:

```bash
$ source env/bin/activate
```

# 2. Setup django rest framework and dr_scaffold:

- Let's install django rest framework and dr_scaffold packages using pip like the following:

```bash
$ pip install djangorestframework
$ pip install dr-scaffold
```

- Next let's add these packages to our project `INSTALLED_APPS` inside `myApi/settings.py` like this:

```python
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'dr_scaffold'
]
```

# 3. Scaffold a blog api with Articles and Authors

Our blog api will be composed of two main resources an Article and a Author.

- Let's scaffold our Author first:

```bash
$ python manage.py dr_scaffold blog Author name:charfield

🎉 Your RESTful Author api resource is ready 🎉
```

> this command will generate a blog folder with `models.py` > `admin.py` `views.py` `serializers.py` `urls.py` all populated with appropriate code that your REST api needs for Author resource

- Lets also generate the Article resource:

```bash
$ python manage.py dr_scaffold blog Post body:textfield author:foreignkey:Author

🎉 Your RESTful Post api resource is ready 🎉
```

> this command will do the same thing but also will add a relation to our Author resource through a `foreignkey` field.

- In order to generate the database tables let's add blog to our `INSTALLED_APPS` inside `myApi/settings.py`:

```python
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'dr_scaffold',
    'blog'
]
```

- Then let's run these commands to generate our migrations and migrate the database:

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

- Finally add our blog to our project's `urlpatterns` inside `myApi/urls.py`:

```python
urlpatterns = [
    ...,
    path("blog/", include("blog.urls")),
]
```

- Don't forget to import include in your project's `urls.py` like so :

```python
from django.conf.urls import include
```

- Your `urls.py` should look something like this in the end:

```python
from django.conf.urls import include #our added import
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("blog/", include("blog.urls")), #our added bol path
]
```

- Now run `python manage.py runserver` and head over to `http://127.0.0.1:8000/blog/` to see your fully created REST blog API.. and also you can generate a super user with `python manage.py createsuperuser` then head over to `http://127.0.0.1:8000/admin` to check the admin panel.

Enjoy 🎉
