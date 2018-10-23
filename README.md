# graphql-microservices

1. Upgrade fbi to v3.2.1

   ```bash
   npm i -g fbi
   ```

1. Add template

   ```bash
   fbi rm mod -f
   fbi add https://github.com/fbi-templates/fbi-project-mod.git
   ```

1. Run sub services

   ```bash
   cd service-1
   fbi s

   cd service-2
   fbi s
   ```

1. Run main services

   ```bash
   cd main
   fbi s
   ```

1. Test

   http://localhost:3000/graphql/s1

   http://localhost:3000/graphql/s2
