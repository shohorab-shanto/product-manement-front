const   PermissionAbility = ({
  children,
  permission
}) => {
  let data = JSON.parse(localStorage.getItem('user'));
  let user = data.user;
  let permissions = user?.permissions;

  if (user?.role === 'Admin')
    return children;

  if (!permission)
    return children;

  return permissions?.includes(permission)?children : null;
};

export default PermissionAbility;