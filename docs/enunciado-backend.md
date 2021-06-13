

# Reto backend

Desde cliente nos han pedido poder hacer una implementación de varias APIs y poder simplificar la respuesta y el eso de estas.

El cliente quiere poder guardar los datos de sus usuarios y de las cuentas de Github, Gitlab y además poder comunicarse con ellos a través de un sistema de mensajería SMTP.

El arquitecto propone el siguiente esquema:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FeS3YIa01yjhCUw2DZ8sFHB%2FBDTDesign%3Fnode-id%3D75%253A38" allowfullscreen></iframe>


----
### User taks | 

- **TASK1:** Puedo acceder a la api a través de: "http://localhost:3000"
- **TASK2:** Contiene los siguientes end points:
    - **ST1:** *GET* /user
        - **Descripción**: Obtienes el objeto entero de un usuario
    - **ST2:** *DELETE* /user/:id
        - **Descripción**: Se puede borrar objeto user a través de su ID
    - **ST3:** *PUT* /user/:id
        - **Descripción**: Se puede actualizar un usuario a través de su ID
    - **ST4:** *POST* /user 
        - **Descripción**: Crea un usuario 
    - **ST5:** *GET* /user/:id/gitlab
        - **Description**: Devuele los datos de usuario del modelo de githubUser entrando dándo el nombre de usuario gitlab
    - **ST6:** *GET* /user/:id/github
        - **Description**: Devuele los datos de usuario del modelo de githubUser entrando dándo el nombre de usuario github    
    - **ST7:** *POST* /github/:username
        - **Descripción**: Crea un GithubUserl, lo conecta con un usuario previamante creado a través de su id y guarda el User
    - **ST8:** *POST* /gitlab/:username
        - **Descripción**: Crea un GitlabUser, lo conecta con un usuario previamante creado a través de su id y guarda el User
    - **ST9:** *GET* /countries
        - **Description**: Devuele la lista de paises donde los parámetros que devuelo son los que se muestran en el diseño de la arquitectura
    - **ST10:** *POST* /register
        - **Description:** Registra al usuario y lo, guarda la sesión usando una estratégia local y envía la información del usuario. En este proceso a través de la función **TASK3** para verficiar el correo introducido.
    - **ST11:** *GET* /login
        - **Description:** Guarda la sesión usando una estratégia local y envía la información al usuario
    - **ST12** *GET* /notification
        - **Descripción:** Envía un mensaje de notificación standar al usuario utilizando el config del **TASK6**
- **TASK3:** Generar un servicio que utilice la API de [Mailboxlayer](https://mailboxlayer.com/) y permita para verificar el correo de un usuario, tanto si tiene el formato de correo cómo si tiene un servidor existente asignado al dominio utilizado. 
- **TASK4:** Generar una función que al cargar el servidor coja todos los datos de la API de [RESTCountries](https://restcountries.eu/) y genere la lista de Paises en el backend que únicamente contenga los datos necesarios para el cliente (ver imagen)
- **TASK5:** Crear un método de AUTH Local para guardar la sesión del usuario.
- **TASK6:** Configurar un método de SMTP para poder enviar correos de forma automática a los usuarios.
- **TASK7:** Configurar PostgreSQL como posible BDD
- **TASK8:** Condigurar MongoDB como BDD principal.

----

### DOD | Definition of Done

- **DOD-1:** Se ha hecho deploy de la API
- **DOD-2:** Se han testado los diferentes endpoints de alguna forma: Testing (Unit, Integracióin, E2E) o Postman/Inmsomia
- **DOD-3:** Tiene que estar desarrollado en NodeJS o Java

---

### Reglas y recomendaciones 

- Si se detectan posibles plagios y copias se descalificará automáticamente a la persona
- Recomendable utilizar clean code y clean architecture


### Recursos
- [Naming Cheatsheet](https://github.com/gagocarrilloedgar/naming-cheatsheet)
- [RESTCountries](https://restcountries.eu/)
- [Mailboxlayer](https://mailboxlayer.com/)
- [JavaMail](https://javaee.github.io/javamail/)
- [GitHub API](https://docs.github.com/es/rest)
- [Gitlab API](https://docs.gitlab.com/ee/api/)
- [NodeMailer](https://nodemailer.com/about/)
- [Clean Architecture | CodelyTV](https://www.youtube.com/watch?v=y3MWfPDmVqo)
- [Arquitectura Hexagonal | CodelyTV](https://www.youtube.com/watch?v=GZ9ic9QSO5U)
- **Providers para hacer deploy:**
    - [Vercel](https://vercel.com/)
    - [Heroku](https://www.heroku.com/)
    - [Azure](https://azure.microsoft.com/es-es/)
    - [Digital Ocean](https://www.digitalocean.com/)
    - [OVH Cloud](https://www.ovh.es/)
    - [Google Cloud](https://cloud.google.com/)