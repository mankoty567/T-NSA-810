# 🐛 Vulnerabilities found

## 📖 Informations

- **Instance :** Virtual machine n°4
- **Service :** portainer
- **Severity :** high

## 🔎 Details

**CVE URL :** https://www.cvedetails.com/cve/CVE-2020-24264/

**Vulnerability description**

_All users that have at least the permission to create container in one environment can run a container that bind mounts the entire host filesystem via API, the permission restrictions are only applied in frontend but not backend. Luckily on the portainer instance there is no such user that has the permission to run a container._

**How we found it**

We performed a port scan on VM 4, it turns out the port 9000 is exposed, after requesting it from the browser we found that it's portainer that is running on this port.
By testing the username-password list that the ex-SysAdmin left, we were able to find the right credentials for a user that has no rights. After logging in we found the version of Portainer: 1.23.0, which includes this vulnerability.

---

# Action plan

## Description

_Since it's a major vulnerability in this version, and the version is way outdated, the best practice is just to upgrade the version of portainer to the latest LTS version._

## Commands

Simply follow theses steps (under root):

```bash
# Remove the current portainer container
docker rm -f portainer

# Remove the current portainer data volume
docker volume rm portainer_data

# Create portainer data volume
docker volume create portainer_data

# Launch portainer container
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:lts
```

# Recommendations

1. Get the admin access to portainer before re-creating a new instance. This will allow you to get all the existing configuration (especially for environment) in portainer. This could be done by changing the hash of the password of the user `soupeladmin` directly in the `portainer.db`, using any kind of program that allows you to read and modify BoltDB file, in our case `boltbrowser`.
2. Use more secured password following ANSSI's recommandation.
3. 

...

## Known issues

_Explain if you can encounter issues and how to fix them_
