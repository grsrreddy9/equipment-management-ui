import React from 'react';
import {useSelector} from 'react-redux';

function isUserHasRequiredPermissions(userPermissions, requiredPermissions) {
  const permissions = userPermissions.map((permission) => {
    return permission.split("'").join(''); //strip unnecessary single quotes in the permisison string
  });
  return requiredPermissions.every((requiredPermission) => {
    return permissions.includes(requiredPermission);
  });
}

const doesUserHaveAtLeastOnePermission = (
  userPermissions,
  desirablePermissions,
) => {
  const permissions = userPermissions.map((permission) => {
    return permission.split("'").join(''); //strip unnecessary single quotes in the permission string
  });
  return desirablePermissions.some((desirablePermission) => {
    return permissions.includes(desirablePermission);
  });
};

function isUserHasSomeOfThePermissions(userPermissions, requiredPermissions) {
  const permissions = userPermissions.map((permission) => {
    return permission.split("'").join(''); //strip unnecessary single quotes in the permisison string
  });
  return requiredPermissions.some((requiredPermission) => {
    return permissions.includes(requiredPermission);
  });
}

function isUserHasRequiredRoles(userRoles, requiredRoles) {
  const roles = userRoles.map((role) => {
    return role.split("'").join(''); //strip unnecessary single quotes in the role string
  });
  const roleGroupEmails = requiredRoles.flat();
  return roleGroupEmails.every((requiredRole) => {
    return roles.includes(requiredRole);
  });
}

function isUserHasSomeOfTheRoles(userRoles, requiredRoles) {
  const roles = userRoles.map((role) => {
    return role.split("'").join(''); //strip unnecessary single quotes in the role string
  });
  const roleGroupEmails = requiredRoles.flat();
  return roleGroupEmails.some((requiredRole) => {
    return roles.includes(requiredRole);
  });
}

function authorize(Component, FallBackComponent = null) {
  return function AuthorizedComponent({
    requiredPermissions = [],
    requiredRoles = [],
    allRequired = true,
    ...componentProps
  }) {
    const {permissions: userPermissions, groups: userGroups} = useSelector(
      (state) => {
        const {
          userState: {
            userDetailState: {permissions, groups},
          },
        } = state;
        return {permissions, groups};
      },
    );

    if (requiredPermissions) {
      const permissionCheck = allRequired
        ? isUserHasRequiredPermissions
        : isUserHasSomeOfThePermissions;
      if (permissionCheck(userPermissions, requiredPermissions)) {
        return <Component {...componentProps} />;
      }
    } else if (requiredRoles) {
      const roleCheck = allRequired
        ? isUserHasRequiredRoles
        : isUserHasSomeOfTheRoles;
      if (roleCheck(userGroups, requiredRoles)) {
        return <Component {...componentProps} />;
      }
    }

    if (FallBackComponent) {
      return <FallBackComponent />;
    }
    return null;
  };
}

export {authorize};
