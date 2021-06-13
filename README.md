# BDT HACKATHON NUWE

## Enunciado 

Desde cliente nos han pedido poder hacer una implementación de varias APIs y poder simplificar la respuesta y el eso de estas.

El cliente quiere poder guardar los datos de sus usuarios y de las cuentas de Github, Gitlab y además poder comunicarse con ellos a través de un sistema de mensajería SMTP.

El arquitecto propone el siguiente esquema:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FeS3YIa01yjhCUw2DZ8sFHB%2FBDTDesign%3Fnode-id%3D75%253A38" allowfullscreen></iframe>

![Arquitectura Backend](./backend.png)
----
### User taks | 

- **TASK1:** Puedo acceder a la api a través de: "http://localhost:3000"
- **TASK2:** Contiene los siguientes end points:
    - **ST1:** *GET* /user/:id
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
    - **ST11:** *POST* /login
        - **Description:** Guarda la sesión usando una estratégia local y envía la información al usuario
    - **ST12** *POST* /notification
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


## MI SOLUCIÓN

Resololución de las distintas tareas:
**TASK1:** Se levanta un servidor *nodeJS* usando el framework *expressJS*.
**TASK2:** Se implementan los distintos endpoints usando *router* de expressJS. Se hace la persistencia de datos con base de datos noSQL *mongoDB* accediendo a la misma con el ORM *mongoose*, haciendo modelos de datos para las entidades *User*, *UserGithub*, *UserGitlab* y *Country*.
Se separa la estructura de la aplicación usando controllers, y helpers. Se separan endpoints públicos (/register y /login) del resto que se dejan como privado, necesitándose una cookie autenticada para su acceso.

**TASK3:** Empleando la API de *Mailboxlayer* se valida el correo electrónico del usuario a la hora del registro, no permitiendo continuar si el email tiene un *score* de menos de 0.6. Esta validación se realiza directamente en la función addUser del controller de usuario.
**TASK4:** Cada vez que se carga la aplicación, se fuerza la actualización de la colección Countries, borrando los datos previos y tomando y filtrando el contenido de la api *RESTCountries*.
Se hace validación del código de pais a la hora del registro del usuario. En este caso la validación se hace directamente en el modelo Country.
**TASK5:** Se hace autenticación en los endpoint /login y /register empleando *passport*, *passport.local* y *express-session* para la gestión de la sesión de usuario. Con la cookie generada permite el acceso al resto de endpoints que se dejan como privados.
**TASK6:** Se implementa *nodemailer* para mandar mensajes de correo entre usuarios. El endpoint /notification recibe el nombre de usuario al que se quiere mandar el correo y el mensaje a mandar. El usuario que envía el mensaje se saca del middleware de autenticación por cookies y el correo electrónico de la colección User.
Se implementa tanto para correo real (gmail), como para un fake-smpt-server como es *ethereal.email* que simula el envío del correo. En el deploy de heroku se usa solo ethereal.email.
**TASK7:** y **TASK8:** Se usa únicamente mongoDB como base de datos.


**DOD-1:** Se hace deploy en heroku: https://dbthackathon.herokuapp.com/
**DOD-2:** Se hace testing de los endpoint y de alguna de las funciones empleando *jest* y *supertest*. Además se prueba la aplicación tanto en local, como en el despliegue usando *postman*. Los archivos de postman se pueden encontrar en la carpeta *docs*
**DOD-3:** La apliación se ha desarrollado en javascript con nodeJS.

## INSTALACIÓN
Para instalar la apliación hay que hacer los siguientes pasos:
* Clonar el repositorio: ```git clone https://github.com/rovilram/bdt-hackathon```
* Instalar las librerías necesarias: ```npm install```
* Lanzar la aplicación: ```npm start```