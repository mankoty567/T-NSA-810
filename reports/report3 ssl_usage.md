# 🐛 Vulnerabilities found

## 📖 Informations

- **Instance :** Virtual machine n°1 & 2
- **Service :** docker
- **Severity :** medium

## 🔎 Details

**CVE URL :** https://www.example.com

**Vulnerability description**

All data exchanged by transfert protocol aren't signed or encrypted, implying multiple risks.

- Man in the middle attack : without any possibility to protect transfert of data, any middle service can intercept and read every piece of information.
- Data leak : some sensitive data can be gotten by the lack of SSL certificate.
- Phishing attack : anyone will be more thrusted and use similar domain to trap them into a new trap.

**How we found it**

We simply use an SAST scan, especially sonarqube here.
To retrieve theses information, you can host a sonarqube instance. There is a compose file to install it :

```Yaml
version: “3.9”

services:
  sonarqube:
    depends_on:
      - db
    networks:
      - "sonar-net"
    ports:
      - 9000:9000
    image: sonarqube:community
    environment:
      SONAR_JDBC_URL: jdbc:postgresql://db:5432/sonar
      SONAR_JDBC_USERNAME: sonar
      SONAR_JDBC_PASSWORD: sonar
      SONAR_ES_BOOTSTRAP_CHECKS_DISABLE: true

    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_logs:/opt/sonarqube/logs
  db:
    image: postgres:12
    networks:
      - "sonar-net"
    environment:
      POSTGRES_USER: sonar
      POSTGRES_PASSWORD: sonar
    volumes:
      - postgresql:/var/lib/postgresql
      - postgresql_data:/var/lib/postgresql/data

networks:
  sonar-net:
    driver: "bridge"
volumes:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_logs:
  postgresql:
  postgresql_data:

```

Then, after a [successfull setup](https://docs.sonarsource.com/sonarqube/latest/try-out-sonarqube/#analyzing-a-project), use a scanner on your repository :

```bash
docker run \
    --rm \
    --network="host" \
    -e SONAR_HOST_URL="http://localhost:9000" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=YOUR_PROJECT_NAME" \
    -e SONAR_TOKEN="YOUR_TOKEN" \
    -v "./back_student:/usr/src" \
    sonarsource/sonar-scanner-cli
```

Where :

- YOUR_PROJECT_NAME is the project name used on sonarqube server.
- YOUR_TOKEN is the token got from successful setup.

Then, check about security hotspots !

---

# Action plan

## Description

There is two actions needed for enforcing SSL usage :

- Usage of secure http url, with https for example.
- Using certificate to secure http traffic.

## Commands

For theses instructions, we will be following a manuel openSSL certificate generation, without using let's encrypt. If there is a need, follow [theses steps](https://phoenixnap.com/kb/letsencrypt-docker) instead.

Let's get started !
First, we need to create certificate to ensure usage of SSL :

```bash
mkdir ssl && cd ssl

# Create ssl config file
openssl genrsa -out server.key 2048
openssl req -key server.key -new -out server.csr
openssl x509 -signkey server.key -in server.csr -req -days 365 -out server.crt
# Or use letsencrypt when a domain name is used

# Ensure to get right permission for production usage
chmod 644 server.*
```

Then, use a custom nginx configuration to ensure https communication. Put it simply in a separate folder, like `./nginx/nginx.conf` :

```conf
pid /tmp/nginx.pid;

events { }

http {
    ssl_certificate /opt/certificates/server.crt;
    ssl_certificate_key /opt/certificates/server.key;
    include mime.types;
    server {
        listen 443 ssl;

        location / {
            root /usr/share/nginx/html;
            try_files $uri /index.html;
        }
    }
}
```

Finaly, add docker theses compose instruction :

```yml
#
volumes:
  - ./ssl:/opt/certificates/
  - ./nginx/nginx.conf:/etc/nginx/nginx.conf
ports:
  - 443:443
```

# Recommendations

1. If there is a need to use it on a production with domain name, don't forget to follow [theses steps](https://phoenixnap.com/kb/letsencrypt-docker) insteads.
2. Remember to renew your certificates each time they will expire. Otherwise, your services will not communicate.
3. Accord your CORS policies to use https and domain validation, and remove non securised http traffic.

## Known issues

- Self signed certificate : if there is a message from your web browser, don't worry and simply allow the https traffic. It's because we didn't use a certification authority entity to ensure that the security authenticity.
