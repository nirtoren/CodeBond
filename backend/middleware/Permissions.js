const UserPermissions = ['create_post', 'create_comment', 'read_post', 'read_comment', 'update_own_profile', 'change_own_password', 'delete_own_account'];
const ModeratorPermissions = [...UserPermissions, 'update_post', 'delete_post', 'delete_comment', 'moderate_comments'];
const AdminPermissions = [...ModeratorPermissions, 'manage_users', 'manage_roles'];

module.exports = {
    user: UserPermissions,
    moderator: ModeratorPermissions,
    admin: AdminPermissions
}