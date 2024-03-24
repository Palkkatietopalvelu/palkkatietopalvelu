from invoke import task

@task
def start(ctx):
    ctx.run("poetry run flask --app src/app.py run")

@task
def lint(ctx):
    ctx.run("pylint src", pty=True)

@task
def test(ctx):
    ctx.run("pytest src", pty=True)

@task
def coverage(ctx):
    ctx.run("coverage run --branch -m pytest src", pty=True)
    ctx.run("coverage html", pty=True)

@task
def robottests(ctx):
    ctx.run("robot src/tests/robot", pty=True)

@task
def revision(ctx):
    ctx.run("flask --app src/app.py db revision --directory src/migrations")
