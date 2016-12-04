'use strict'

const Validator = use('Validator')
const Database = use('Database')

const ToDo = use('App/Model/Todoe')
const User = use('App/Model/User')
const Family = use('App/Model/Familie')
const Vault = use('App/Model/Vault')

class VaultController {
    * show(req, res) {
        var user = yield User.findBy('username',yield req.session.get('username'));
        
        // Check if user exists.
        if (user == null) {
            return res.redirect('/');
        }

        // Check if user belongs to a family.
        if (user.family_id == null) {
            return res.redirect('/family/create');
        }

        const family = yield Family.findBy('id', user.family_id);

        // Check if family exists.
        if (family == null) {
            return res.redirect('back');
        }

        // Select people based on privilage.
        var people;
        if (user.id == family.user_id) {
            people = yield User.query().where('family_id', user.family_id).fetch();
        } else {
            people = yield User.query().where('id', user.id).fetch();
        }

        var peopleJSON = people.toJSON();

        for(var i = 0; i < peopleJSON.length; i++) {
            var vault = yield Vault.findBy('user_id', peopleJSON[i].id);
            peopleJSON[i]['vault'] = vault;
        }

        yield res.sendView('list_vaults', {
            people: peopleJSON,
        });
    }

    * modifySubmit(req, res) {
        var user = yield User.findBy('username',yield req.session.get('username'));
        
        // Check if user exists.
        if (user == null) {
            return res.redirect('/');
        }

        // Check if user belongs to a family.
        if (user.family_id == null) {
            return res.redirect('/family/create');
        }

        const family = yield Family.findBy('id', user.family_id);

        // Check if family exists.
        if (family == null) {
            return res.redirect('back');
        }

        var post = req.post();

        if(!post.id) {
            return res.redirect('back');
        }

        var other_user = yield User.findBy('id', post.id);

        if (other_user == null) {
            return res.redirect('back');
        }

        if (user.family_id != other_user.family_id) {
            return res.redirect('back');
        }

        if (user.id != family.user_id && user.id != other_user.id) {
            return res.redirect('back');
        }

        if (!post.value || post.value < 0) {
            return res.redirect('back');
        }

        var vault = yield Vault.findBy('user_id', other_user.id);
        vault.value = post.value;
        yield vault.save();

        return res.redirect('back');
    }
}

module.exports = VaultController