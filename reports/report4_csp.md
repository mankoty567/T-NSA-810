# 🐛 Vulnerabilities found

## 📖 Informations

- **Instance :** Virtual machine n°1
- **Service :** React application
- **Severity :** high

## 🔎 Details

**Vulnerability description**

If nothing is provided, you can :

- Do a man in the middle attack to steal and use content.
- Using cross scripting type attack to get more information than provided.
- Using clickjacking attack, to redirect user in other without any protection.

**How we found it**

You can simply found it by checking the source code, and checking the meta “Content-Security-Policy” tag.

---

# Action plan

## Description

There is only one way to fix it : configure CSP !

## Commands

Add this following html tag to your index.html file :

```bash
<meta
      http-equiv="Content-Security-Policy"
      content="default-src 'http://example1.com' 'http://example2.com';
      form-action 'http://example1.com' 'http://example2.com';
      img-src 'self';
      child-src 'none';
      frame-ancestors 'http://example1.com' 'http://example2.com';"
    />
```

# Recommendations

1. Be the most precise about your url sites, and do not use wildcards instructions to restrict vector of attacks.
2. Don't forget to navigate with open console into your application. Bad configuration implies configuration blocked.
