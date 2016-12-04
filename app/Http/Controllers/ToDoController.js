'use strict'

const ToDo = use('App/Model/Todoe')
const User = use('App/Model/User')

const Validator = use('Validator')
const Database = use('Database')

class ToDoController {
    * todoes(req, res) {    
        const user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            res.redirect('/');
        }

        // Check if user belongs to family.
        if (user.family_id == null) {
            return res.redirect('/family');
        }

        const todoes = yield ToDo.query().where('user_id', user.id).fetch();

        yield res.sendView('list_todoes', {
            todoes: todoes.toJSON(),
        });
    }

    * todoesbyme(req, res) {
        const user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            res.redirect('/');
        }

        // Check if user belongs to family.
        if (user.family_id == null) {
            return res.redirect('/family');
        }

        const todoes = yield ToDo.query().where('owner_id', user.id).fetch();

        yield res.sendView('list_todoes', {
            todoes: todoes.toJSON(),
        });
    }

    * newtodo(req, res) {

        const user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            res.redirect('/');
        }

        // Check if user belongs to family.
        if (user.family_id == null) {
            return res.redirect('/family');
        }

        const family = yield User.query().where('family_id', user.family_id).fetch();

        yield res.sendView('new_todo', {
            family: family.filter((u) => (u.level >= user.level)).toJSON(),
        });
    }

    * newtodoSubmit(req, res) {
        const owner_user = yield User.findBy('username',yield req.session.get('username'));

        // Check if owner exists.
        if (owner_user == null) {
            return res.redirect('/');
        }

        // Check if owner belongs to a family.
        if (owner_user.family_id == null) {
            return res.redirect('/family');
        }

        var post = req.post();

        const user = yield User.findBy('name',post.user);

        // Check if user exists.
        if (user == null) {
            return res.redirect('back')
        }

        // Check if owner and user belongs to the same family.
        if (owner_user.family_id != user.family_id) {
            return res.redirect('back');
        }

        // Check that owner has the right.
        if (owner_user.level > user.level) {
            return res.redirect('back');
        }

        // Create and save new todo.
        var todoData = {
            title:post.title,
            desc:post.desc,
            owner_id:owner_user.id,
            user_id:user.id,
            finished:false,
            family_id:owner_user.family_id
        };

        var todo = yield ToDo.create(todoData);
        yield todo.save();

        res.redirect('/todoes/byme');
    }

    * finishSubmit(req, res) {  
        const user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            return res.redirect('/');
        }

        // Check if user belongs to family.
        if (user.family_id == null) {
            return res.redirect('/family');
        }

        var todo=yield ToDo.findBy('id', req.param('id'));

        // Check if todo exists.
        if (todo == null) {
            return res.redirect('back');
        }

        // Check that todo is assigned to user.
        if (todo.user_id != user.id && todo.owner_id != user.id){
            return res.redirect('back');
        }

        // Finish and save todo.
        todo.finished=true;
        yield todo.save();

        res.redirect('back')
    }
}

module.exports = ToDoController
