# next-porto-cli
A cli for next.js to scaffold your application using porto architecture

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g next-porto-cli
$ npc COMMAND
running command...
$ npc (--version)
next-porto-cli/0.0.0 darwin-x64 node-v16.16.0
$ npc --help [COMMAND]
USAGE
  $ npc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`npc hello PERSON`](#next-porto-cli-hello-person)
* [`npc hello world`](#next-porto-cli-hello-world)
* [`npc help [COMMAND]`](#next-porto-cli-help-command)
* [`npc plugins`](#next-porto-cli-plugins)
* [`npc plugins:install PLUGIN...`](#next-porto-cli-pluginsinstall-plugin)
* [`npc plugins:inspect PLUGIN...`](#next-porto-cli-pluginsinspect-plugin)
* [`npc plugins:install PLUGIN...`](#next-porto-cli-pluginsinstall-plugin-1)
* [`npc plugins:link PLUGIN`](#next-porto-cli-pluginslink-plugin)
* [`npc plugins:uninstall PLUGIN...`](#next-porto-cli-pluginsuninstall-plugin)
* [`npc plugins:uninstall PLUGIN...`](#next-porto-cli-pluginsuninstall-plugin-1)
* [`npc plugins:uninstall PLUGIN...`](#next-porto-cli-pluginsuninstall-plugin-2)
* [`npc plugins update`](#next-porto-cli-plugins-update)

## `npc hello PERSON`

Say hello

```
USAGE
  $ npc hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/theianrey/next-porto-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `npc hello world`

Say hello world

```
USAGE
  $ npc hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ npc hello world
  hello world! (./src/commands/hello/world.ts)
```

## `npc help [COMMAND]`

Display help for next-porto-cli.

```
USAGE
  $ npc help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for next-porto-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `npc plugins`

List installed plugins.

```
USAGE
  $ npc plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ npc plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `npc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ npc plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ npc plugins add

EXAMPLES
  $ npc plugins:install myplugin 

  $ npc plugins:install https://github.com/someuser/someplugin

  $ npc plugins:install someuser/someplugin
```

## `npc plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ npc plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ npc plugins:inspect myplugin
```

## `npc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ npc plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ npc plugins add

EXAMPLES
  $ npc plugins:install myplugin 

  $ npc plugins:install https://github.com/someuser/someplugin

  $ npc plugins:install someuser/someplugin
```

## `npc plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ npc plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ npc plugins:link myplugin
```

## `npc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ npc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ npc plugins unlink
  $ npc plugins remove
```

## `npc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ npc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ npc plugins unlink
  $ npc plugins remove
```

## `npc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ npc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ npc plugins unlink
  $ npc plugins remove
```

## `npc plugins update`

Update installed plugins.

```
USAGE
  $ npc plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
