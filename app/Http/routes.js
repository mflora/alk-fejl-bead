'use strict'

const Route = use('Route')

Route.get('/', 'UserController.main');
Route.get('/register', 'UserController.register');
Route.post('/register', 'UserController.registerSubmit');
Route.get('/login', 'UserController.login');
Route.post('/login', 'UserController.loginSubmit');
Route.get('/logout', 'UserController.logout');

Route.get('/todoes', 'ToDoController.todoes');
Route.get('/todoes/byme', 'ToDoController.todoesbyme');
Route.get('/todoes/create', 'ToDoController.newtodo');
Route.post('/todoes/create', 'ToDoController.newtodoSubmit');
Route.post('/todoes/:id', 'ToDoController.finishSubmit');

Route.get('/family', 'FamilyController.show');
Route.get('/family/create', 'FamilyController.create');
Route.post('/family/create', 'FamilyController.createSubmit');
Route.get('/family/member', 'FamilyController.member');
Route.post('/family/member', 'FamilyController.memberSubmit');
Route.post('/family/:id', 'FamilyController.modifySubmit');

Route.get('/vaults', 'VaultController.show');
Route.post('/vaults', 'VaultController.modifySubmit');

Route.group('ajax', function () {
    Route.post('/login', 'UserController.ajaxLogin');
    Route.post('/todoes/create', 'ToDoController.ajaxCreate');
    Route.post('/family/create', 'FamilyController.ajaxCreate');
}).prefix('/ajax');
