## Project commands

`yarn start` - to launch your project  

## Pre requirements

1. Pull repo.
2. `git checkout -b <name that you have set in pre-requirements>/main`
3. `git push origin <name that you have set in pre-requirements>/main`
4. If you are windows user, make sure that `bash` have been installed if not check [Installation link](https://hackernoon.com/how-to-install-bash-on-windows-10-lqb73yj3);
5. Open Terminal in your project (make sure that you are in main directory with `hooks` folder)
6. (ONLY FOR WINDOWS USERS) Change first line in `./hooks/commit-msg`, `./hooks/pre-commit` and `./hooks/setup/hooks` from `#!/bin/sh` to `#!/bin/bash`;
7. Run `nano ./hooks/pre-commit` and change `USER_NAME="user_name"` on third string to `USER_NAME="<YOUR-NAME_LAST_NAME>"` Example: `USER_NAME="my_name"` and save the file.
8. Run command `yarn configure:hooks` (FOR WINDOWS USERS `yarn configure:hooks:windows`);
9. Run command `yarn start`

Now you can run project by calling `yarn start`

Avoid Upper case! Do not use `N_Surname` syntax or `Implement-Crud-Todo` syntax

If you keep experiencing something like: **tslint: command not found**
please do the following:

```

yarn global add tslint typescript

```

## Time-frames

Time-frames of the test task is highly important! You have only 2 weeks for the task below, please use this time wisely. Good luck!

## Required features

1. **Todo list - CRUD operations on backend**;

- _Each `PUT` `POST` rout should has validation of `req.body` and throw `400` error in case of failed validation_
- _Separate your logic from routes. You should perform all interactions with `DB` inside your `services/<filename>.service.ts` file and import it to `controllers/<filename>.controller.ts`. After that you can call your controllers in routes_
- _Create GENERIC validator, isExist (for put, delet and get by id), tryCatch middlewares _

2. **Todo list - Connect your CRUD operations with frontend**;

- _You should split your code on logical components ( `<TodoContainer />`, `<TodoElement/>` etc);_
- _For Edit/Add you should use forms written with [Formik](https://formik.org/docs/overview);_
- _Put logic related to server interactions inside `service/http.ts` file_
- _For data fetching you can use [React Query](https://react-query.tanstack.com/), it also help you to globally store your data_
- _Todo list page should have different behaviors on different devices. Desktop - should be displayed as a table, Tablet - should be as slider, Mobile - list._
- _Your font sizes, colors, margins, paddings should be in THEME const_
- _Create QUERY_KEYS and ROUTER_KEYS const for routing_ 
- _Use styled components_
- _Design should be tablet and mobile adaptive_ 

3. **Authorization (login/signup) backend;**

- _Use jwt [authorization](https://nodejsdev.ru/doc/jwt/) and [Passport](http://www.passportjs.org/) for that_
- _Logic related to token processing should be stored in `middlewares/auth.middleware.ts`_
- _Private todos should be accessible only for Todo creators_
- _Change password endpoint_

4. **Authorization (login/signup) frontend;**

- _Should store token in localStorage_
- _Use Formik for handling validation and submit func_
- _Extend your http service for interacting with auth requests (check our codestyle)_
- _Integrate logout and edit user information UI_

5. **Filters for todo list by title and statuses (private and completed);**

- _You should pass filter params through `req.params`(`localhost:3000/todo?search=test&status=completed`)_
- _Connect backend filtration with UI components_
6. **Button pagination;**

- _All pagination should be handled by backend_
- _Change frontend request with pagination params_
- _Pagination should be done differently on different devices. Desktop - button pagination, Tablet - horizontal scroll pagination, Mobile - vertical scroll pagination_
