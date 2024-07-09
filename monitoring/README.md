## Install InfluxDB on monitoring server

```bash
docker run -d  --name influxdb2  --publish 8086:8086  --mount type=volume,source=influxdb2-data,target=/var/lib/influxdb2  --mount type=volume,source=influxdb2-config,target=/etc/influxdb2  --env DOCKER_INFLUXDB_INIT_MODE=setup  --env DOCKER_INFLUXDB_INIT_USERNAME=influx_admin  --env DOCKER_INFLUXDB_INIT_PASSWORD=[password]  --env DOCKER_INFLUXDB_INIT_ORG=CIA  --env DOCKER_INFLUXDB_INIT_BUCKET=cia_bucket  --restart always influxdb:2
```


## Install Telegraf on all servers

See the docker compose files.

## Fix Portaienr

This task is automated with Ansible, see the "automation" directory.
