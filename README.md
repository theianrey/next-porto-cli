
# next-porto-cli

A cli for next.js to scaffold your application using [porto architecture](https://github.com/Mahmoudz/Porto)

  

<!-- toc -->

* [next-porto-cli](#next-porto-cli)

* [Usage](#usage)

* [Commands](#commands)

<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session

$ npm install -g next-porto-cli

$ npc COMMAND

running command...

$ npc (--version|--version|-v)

next-porto-cli/0.2.4 darwin-x64 node-v14.20.0

$ npc --help [COMMAND]

USAGE

$ npc COMMAND

...

```

<!-- usagestop -->

# Commands

<!-- commands -->

* [`npc create:project [PROJECTNAME]`](#npc-createproject-projectname)

* [`npc generate:container`](#npc-generatecontainer)

* [`npc generate:page`](#npc-generatepage)

* [`npc help [COMMAND]`](#npc-help-command)

  


## `npc create:project [PROJECTNAME]`

  

Create a Next.js application with porto architechture.

  

```

USAGE

$ npc create:project [PROJECTNAME] [-t] [-f]

  

ARGUMENTS

PROJECTNAME The name of the directory where the application will be installed.

  

FLAGS

-f, --force Force create a project on existing directory.

-t, --typescript Enable typescript support.

  

DESCRIPTION

Create a Next.js application with porto architechture.

```
  


## `npc generate:container`

  

Create a container

  

```

USAGE

$ npc generate:container [-c <value> -s <value>] [-f]

  

FLAGS

-c, --container=<value> Name of the container.

-f, --force Override the existing container files

-s, --section=<value> [default: AppSection] Name of the application section.

  

DESCRIPTION

Create a container

```

  
  

## `npc generate:page`

  

Create a page & page api files for container

  

```

USAGE

$ npc generate:page [-p <value> (-c <value> -s <value>)] [-a] [-f]

  

FLAGS

-a, --api Will include api page files

-c, --container=<value> Container name

-f, --force Override the existing page files

-p, --page=<value> Page path

-s, --section=<value> (required) [default: AppSection] Section name

  

DESCRIPTION

Create a page & page api files for container

```

  

## `npc help [COMMAND]`

  

Display help for npc.

  

```

USAGE

$ npc help [COMMAND] [-n]

  

ARGUMENTS

COMMAND Command to show help for.

  

FLAGS

-n, --nested-commands Include all nested commands in the output.

  

DESCRIPTION

Display help for npc.

```

<!-- commandsstop -->
