## apt

[![CI](https://github.com/Oefenweb/ansible-apt/workflows/CI/badge.svg)](https://github.com/Oefenweb/ansible-apt/actions?query=workflow%3ACI)
[![Ansible Galaxy](http://img.shields.io/badge/ansible--galaxy-apt-blue.svg)](https://galaxy.ansible.com/Oefenweb/apt)

Manage packages and up(date|grade)s in Debian-like systems.

#### Requirements

* `python3-apt` (or `python-apt` for Debian 7)
* `aptitude`

#### Variables

* `apt.manage_sources_list`: [default: `false`]: Whether or not to manage `/etc/apt/sources.list`
* `apt.ubuntu_mirror`: [default: `mirror://mirrors.ubuntu.com/mirrors.txt`]: The mirror to use
* `apt.ubuntu_security_mirror`: [default: `http://security.ubuntu.com/ubuntu`]: The security-mirror to use
* `apt.src_enable`: [default: `true`]: Whether or not to enable source code repositories
* `apt.backports_enable`: [default: `true`]: Whether or not to enable the `backports` repository
* `apt.ubuntu_universe_enable`: [default: `true`]: Whether or not to enable the `universe` repository
* `apt.ubuntu_multiverse_enable`: [default: `true`]: Whether or not to enable the `multiverse` repository
* `apt.ubuntu_backports_enable`: [default: `true`]: Whether or not to enable the `backports` repository [deprecated in favour of `apt.backports_enable`]
* `apt.ubuntu_partner_enable`: [default: `false`]: Whether or not to enable the `partner` repository
* `apt.ubuntu_extras_enable`: [default: `false`]: Whether or not to enable the `extras` repository (only applies to < 16.04)
* `apt.debian_mirror`: [default: `http://deb.debian.org/debian/`]: The mirror to use
* `apt.debian_security_mirror`: [default: `http://security.debian.org/`]: The security-mirror to use
* `apt.debian_contrib_nonfree_enable`: [default: `false`]: Whether or not to enable the `contrib` `non-free` repository

* `apt_dependencies`: [default: `[python3-apt, aptitude]`]: General dependencies for apt modules to work
* `apt.update`: [default: `true`]: Whether or not to update
* `apt.update_cache_valid_time`: [default: `3600`]: Number of seconds the apt cache stays valid
* `apt.upgrade`: [default: `true`]: Whether or not to upgrade
* `apt.upgrade_type`: [default: `dist`]: If yes or safe, performs an aptitude safe-upgrade. If full, performs an aptitude full-upgrade. If dist, performs an apt-get dist-upgrade
* `apt.upgrade_dpkg_options`: [default: `['force-confdef', 'force-confold']`]: Add `dpkg` options to `apt` command
* `apt.clean`: [default: `true`]: Whether or not to clean
* `apt.dpkg_configure`: [default: `false`]: Whether or not to run `dpkg --configure -a`
* `apt.autoremove`: [default: `true`]: Whether or not to autoremove
* `apt.install`: [default: `[]`]: Packages to install
* `apt.extra_install_state`: [default: `latest`]: State of packages to install (e.g. `present`)
* `apt.remove`: [default: `[]`]: Packages to remove
* `apt.remove_purge`: [default: `false`]: Whether or not to purge

* `apt.etc_apt_apt_conf`: [default: `[]`]: List of lines to be added to `/etc/apt/apt.conf`
* `apt.etc_apt_apt_conf_d_files_absent`: [default: `[]`]: List of files to be removed from `/etc/apt/apt.conf.d`

## Dependencies

None

#### Example

```yaml
---
- hosts: all
  roles:
    - apt
  vars:
    apt_etc_apt_apt_conf:
      - |
        APT {
          Install-Recommends "false";
          Install-Suggests "false";
          Get {
            Fix-Broken "true";
          };
        };
    apt_etc_apt_apt_conf_d_files_absent:
      - 20auto-upgrades
```

#### License

MIT

#### Author Information

Mischa ter Smitten (based on work of [kosssi](https://github.com/kosssi) and [Ansibles](https://github.com/Ansibles))

#### Feedback, bug-reports, requests, ...

Are [welcome](https://github.com/Oefenweb/ansible-apt/issues)!
