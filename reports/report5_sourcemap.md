# 🐛 Vulnerabilities found

## 📖 Informations

- **Instance :** Virtual machine n°1
- **Service :** React application
- **Severity :** critical

## 🔎 Details

**Vulnerability description**

It gives absolutely every information of your application. What packages, how it has been coded, what vulnerabilities are present, …

**How we found it**

Simply go to your terminal, and check if you’ve got any access to source code.

---

# Action plan

## Description

There is only one configuration to do.

## Commands

Simply add : `GENERATE_SOURCEMAP=false` before `react-scripts build`

## Known issues

- This command need to be different on windows OS. Add `set \"GENERATE_SOURCEMAP=false\" &&` instead of `GENERATE_SOURCEMAP=false`, at the begininng.
