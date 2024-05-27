# 🐛 Vulnerabilities found

## 📖 Informations

- **Instance :** Virtual machine n°1, 2, 3 & 4
- **Service :** xxx
- **Severity :** critical

## 🔎 Details

**CVE URL :** none.

**Vulnerability description**

_List all vulnerabilities or exploit patterns that you can use_

Anyone can log in to all vms via ssh, with "root" user and a password.
Also, the password is too simple and easily hackable, we could guess it without bruteforce.

**How we found it**

 First step of the project is to gain access to all vms. To do so, we begun by trying to log in via ssh, following a list of credentials given in the subject. After trying them all, we also tried common combinations of username & password frequently used. That's how we found the good combination "root:admin".
 
---

# Action plan

## Description

We will need to fix multiple issues :
  1. Change root's password
  2. Change admin's password (that we will use instead of root)
  3. Configure key authentication on SSH service for admin user and disable password authentication
  4. Disable possibility to ssh for root
  5. Change default ssh port (22)

## Commands

Simply follow theses steps :

```bash
# 1. Change root's password
# Execute this command once you're connected as root
passwd

# Type and retype to confirm your new password
New Password: "VivelajournéedesolidaritéàEpitech"

# 2. Change admin's password
passwd admin

# Type and retype to confirm your new password
New Password: "Mufanréparemoicetteinfrastructurebordeldemerde"

# Optional : make sure "admin" is part of the sudo group, which is called "wheel" in CentOS
getent group wheel

# 2. (bis) In case there is no "admin" user or he's not in the sudo group
# Create an admin user
adduser admin

# Change the password for this user (see step 2.)
# Add "admin" to the sudo group (which is called "wheel" in CentOS)
usermod -aG wheel admin

# 3. Configure key authentication on SSH service for admin user
# Generate ssh keys on your local machine first.
# Create .ssh folder and authorized_keys file in admin's home & give rights
mkdir .ssh
chmod 700 /home/admin/.ssh
cd .ssh
touch authorized_keys
chmod 600 /home/admin/.ssh/authorized_keys

# Modify /home/admin rights
chmod 700 /home/admin

# Copy your public key on the remote machine
ssh-copy-id admin@ipaddress
# It will copy directly in the authorized_keys file

# Then you can try to log in without user/password combination
ssh -i ~/.ssh/id_rsa admin@ipaddress

# Once you can log in, you can disable password authentication
nano /etc/ssh/sshd_config

'PasswordAuthentication no'

# Don't forget to restart sshd service
service sshd restart

# 4. Disable possibility to ssh for root
# Edit sshd_config file
nano /etc/ssh/sshd_config

# Uncomment and modify this line
PermitRootLogin no

# Don't forget to restart sshd service
service sshd restart

# 5. Change default ssh port (22)
# Edit sshd_config file
nano /etc/ssh/sshd_config

# Uncomment and modify this line
Port 26

# Add new port context 26 for ssh (SELINUX)
semanage port -a -t ssh_port_t -p tcp 26

# Check port context
semanage port -l | grep ssh
Output : "ssh_port_t  tcp   26, 22"

# Don't forget to restart sshd service
service sshd restart

# 6. Adjust sshd config to manage ssh connections policy
# Add max authentication tries policy
nano /etc/ssh/sshd_config

# Uncomment and modify this line
MaxAuthTries 3

# Add login grace time policy
# Uncomment and modify this line
LoginGraceTime 60s

# Define which user(s) can ssh
# Add this line
AllowUsers admin
```

# Recommendations

1. Change password of "root" user
  The recommendation is to define a minimum entropy level of 80 bits for a password. To do so, you have 3 options, following ANSSI's advices :

  -**Example 1**: passwords must be composed of a minimum of 12 characters, including upper and lower case, numbers and special characters from a list of at least 37 possible special characters.
  -**Example 2**: passwords must be made up of at least 14 characters including upper case, lower case and numbers, with no special characters required.
  -**Example 3**: a passphrase must be used, consisting of at least 7 words.

2. Admin user instead of root
  To decrease risks, it is recommended to use a non-root user, who has sudo rights. An "admin" user already exists on the vms so we will reuse it. First, we need to change the password of this user, and make sure he's part of the sudo group.

3. Configuring key authentication on SSH service
  Instead of using a combination of username and password to connect via ssh, we recommend you to configure key authentication which is more secure. Basically, if the server doesn't recognize your key, you will not be able to connect to it.

4. Disable ssh login for root
  By default, SSH server is mainly configured to allow root user to log in. However, we advise you to reconfigure all servers to have root logins disabled as a security measure. Instead, we recommend creating another user with sudo rights, so you can control permissions and reduce risks involved by using root.

5. Change default ssh port (22) for another one, which will be less easier to find for hackers.

6. Adjust sshd config to manage ssh connections policy
  Using sshd's built-in configuration to limit connection attempts reduces complexity and dependency on external tools such as fail2ban, while offering a lighter, more straightforward solution for strengthening SSH security.

## To go further

- Add iptables restrictions to limit connections to our private network only
- Also, following ANSSI's recommendations (or personal ones), we advise you to :
- Implement a password policy to prevent risky behavior within the company
- Implement and configure a proxy


## Known issues

_Explain if you can encounter issues and how to fix them