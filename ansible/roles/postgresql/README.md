# PostgreSQL Role

PostgreSQLのインストールと設定を行うrole。

## Requirements

- Ubuntu 20.04/22.04/24.04
- `community.postgresql` collection

## Role Variables

```yaml
postgresql:
  databases:
    - blog_romira_dev
  users:
    - name: blog
      password: "{{ vault_postgresql_blog_password }}"
      db: blog_romira_dev
```

## Example Playbook

```yaml
- hosts: servers
  roles:
    - role: postgresql
      vars:
        postgresql:
          databases:
            - mydb
          users:
            - name: myuser
              password: mypassword
              db: mydb
```

## License

MIT
