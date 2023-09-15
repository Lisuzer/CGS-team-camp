import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import TodoPageContainer from '../todos/todos-page';
import ViewTodoPage from '../todos/view-todo';
import CreateTodoPage from '../todos/create-edit-todo/create-todo';
import EditTodoPage from '../todos/create-edit-todo/edit-todo';
import ProtectedRoute from '../common/utils/protected-route';
import LoginPage from '../auth/login';
import RegisterPage from '../auth/register';
import HeaderComponent from '../common/components/header/header.component';
import RestrictedRoute from '../common/utils/restricted-route';
import SuccessRegisterPage from '../auth/register-success';
import ForgotPasswordPage from '../auth/forgot-password';
import ResetPasswordPage from '../auth/reset-password-success';
import ChangePasswordPage from '../auth/change-password';

export const MainRouter = () => (
  <Router>
    <HeaderComponent />
    <Routes>
      <Route element={<TodoPageContainer />} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route element={<ViewTodoPage />} path={`${APP_KEYS.ROUTER_KEYS.VIEW_TODO}/:id`} />
      <Route element={<ProtectedRoute redirectTo={APP_KEYS.ROUTER_KEYS.LOGIN} />}>
        <Route element={<CreateTodoPage />} path={APP_KEYS.ROUTER_KEYS.CREATE_TODO} />
      </Route>
      <Route element={<ProtectedRoute redirectTo={APP_KEYS.ROUTER_KEYS.LOGIN} />}>
        <Route element={<EditTodoPage />} path={`${APP_KEYS.ROUTER_KEYS.EDIT_TODO}/:id`} />
      </Route>
      <Route element={<RestrictedRoute redirectTo={APP_KEYS.ROUTER_KEYS.ROOT} />}>
        <Route element={<LoginPage />} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
      </Route>
      <Route element={<RestrictedRoute redirectTo={APP_KEYS.ROUTER_KEYS.ROOT} />}>
        <Route element={<RegisterPage />} path={APP_KEYS.ROUTER_KEYS.REGISTER} />
      </Route>
      <Route element={<RestrictedRoute redirectTo={APP_KEYS.ROUTER_KEYS.ROOT} />}>
        <Route element={<ForgotPasswordPage />} path={APP_KEYS.ROUTER_KEYS.RESET_PASSWORD} />
      </Route>
      <Route element={<ProtectedRoute redirectTo={APP_KEYS.ROUTER_KEYS.ROOT} />}>
        <Route element={<ChangePasswordPage />} path={APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD} />
      </Route>
      <Route element={<ResetPasswordPage />} path={APP_KEYS.ROUTER_KEYS.RESET_PASSWORD_SUCCESS} />
      <Route element={<SuccessRegisterPage />} path={APP_KEYS.ROUTER_KEYS.REGISTER_SUCCESS} />
    </Routes>
  </Router>
);
