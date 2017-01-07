'use strict'

const User = use('App/Model/User')
const Vault = use('App/Model/Vault')

const Validator = use('Validator')
const Hash = use('Hash')

class UserController {
    * main(req, res) {
        yield res.sendView('page_home', {
        });
    }

    * login(req, res) {
        yield res.sendView('page_login');
    }

    * loginSubmit(req, res) {
        try{
            var post = req.post();
            yield req.auth.attempt(post.username, post.password);
            yield req.session.put('username', post.username);
            return res.redirect('/todoes');
        }catch(e){
            yield req
                .withOut('password')
                .andWith({ errors: [{
                    message:'Bad credentials'
                }] })
                .flash()
            return res.redirect('back')
        }
    }

    * ajaxLogin(req, res) {
        try{
            var post = req.post();
            yield req.auth.attempt(post.username, post.password);
            yield req.session.put('username', post.username);
            res.ok({
                success:true
            });
        }catch(e){
            res.ok({
                success:false
            })
        }
    }


    * logout(req, res) {
        yield req.auth.logout();
        yield req.session.forget('username');
        res.redirect('/');
    }

    * register(req, res) {
        yield res.sendView('page_register');
    }

    * registerSubmit(req, res) {
        var post = req.post();
        var userData = {
            username:post.username,
            name:post.name,
            email:post.email,
            password:post.password,
            password2:post.password2
        };

        const validation = yield Validator.validateAll(userData, User.rules)

         if (validation.fails()) {
             yield req
                .withOut('password','password2')
                .andWith({ errors: validation.messages() })
                .flash()

            return res.redirect('back')
         }

        delete userData.password2;
        userData.password = yield Hash.make(userData.password);

        var user = yield User.create(userData);
        yield user.save();

        var vaultData = {
            user_id: user.id,
            value: 0,
        }

        var vault = yield Vault.create(vaultData);
        yield vault.save();

        res.redirect('/')
    }
}

module.exports = UserController
