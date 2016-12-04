'use strict'

const Validator = use('Validator')
const Database = use('Database')

const ToDo = use('App/Model/Todoe')
const User = use('App/Model/User')
const Family = use('App/Model/Familie')

class FamilyController {
    * create(req, res) {
        const user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            return res.redirect('/');
        }

        // Check if user has no family.
        if (user.family_id != null) {
            return res.redirect('/family');
        }

        yield res.sendView('new_family', {
        });
    }

    * createSubmit(req, res) {
        var user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            return res.redirect('/');
        }

        // Check if user has no family.
        if (user.family_id != null) {
            return res.redirect('/family');
        }

        var post = req.post();

        // Check if family name is set.
        if (post.family == null) {
            return res.redirect('back');
        }

        // Create family and save it
        var familyData = {
            name:post.family,
            user_id:user.id,
        };

        var family = yield Family.create(familyData);
        yield family.save();

        // Modify user, so it belongs to this family.
        user.family_id = family.id;
        user.level = 1;
        yield user.save();

        return res.redirect('/family');
    }

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


        const familyMembers = yield User.query().where('family_id', user.family_id).fetch();
        const family = yield Family.findBy('id', user.family_id);

        // Based on privilage, show the members of the family
        if (family.user_id == user.id) {
            yield res.sendView('list_family_master', {
                family: familyMembers.toJSON(),
            });
        }else{
            yield res.sendView('list_family', {
                family: familyMembers.toJSON(),
            });
        }
    }

    * modifySubmit(req, res){
        var user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            return res.redirect('/');
        }

        var other_user = yield User.findBy('id', req.param('id'));

        // Check if user with id exists.
        if (other_user == null) {
            return res.redirect('back');
        }

        // Check if user belongs to a family.
        if (other_user.family_id == null) {
            return res.redirect('back');
        }

        // Check if they belong to the same family.
        if (other_user.family_id != user.family_id) {
            return res.redirect('back');
        }

        const family = yield Family.findBy('id', user.family_id);

        // Check if user is the head of the family.
        if (family.user_id != user.id) {
            return res.redirect('back');
        }
        
        var post = req.post();

        // Check if level is set and valid.
        if (!post.level || post.level < 1) {
            return res.redirect('back');
        }

        // Set user level and save it.
        other_user.level = post.level;
        yield other_user.save();

        return res.redirect('back')
    }

    * member(req, res) {
        var user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null) {
            return res.redirect('/');
        }

        const family = yield Family.findBy('id', user.family_id);

        // Check if family exists and user is head of it.
        if (family == null || family.user_id != user.id){
            return res.redirect('back');
        }

        const people = yield User.query().where('family_id', null).fetch();

        yield res.sendView('list_people', {
            people: people.toJSON(),
        });
    }

    * memberSubmit(req, res) {
        var user = yield User.findBy('username',yield req.session.get('username'));

        // Check if user exists.
        if (user == null){
            return res.redirect('/');
        }

        const family = yield Family.findBy('id', user.family_id);

        // Check if family exists and user is head of it.
        if (family == null || family.user_id != user.id){
            return res.redirect('/family');
        }


        var post = req.post();
        // Check if user ID is set.
        if (!post.id){
            return res.redirect('back');
        }

        var other_user = yield User.findBy('id', post.id);

        // Check if other user exists.
        if (other_user == null){
            return res.redirect('back');
        }

        // Check that other user doesn't belong to any family.
        if (other_user.family_id != null){
            return res.redirect('back');
        }

        // Set the level and family of other users.
        other_user.family_id = family.id;
        other_user.level = 10;
        yield other_user.save();

        return res.redirect('/family');
    }
}

module.exports = FamilyController
