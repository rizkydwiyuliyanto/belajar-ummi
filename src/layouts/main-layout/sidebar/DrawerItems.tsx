/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import CollapseListItem from './list-items/CollapseListItem';
import ListItem from './list-items/ListItem';
import Logo from "components/Logo";
import { privateRoutes } from 'routes/paths';
import { useContext } from 'react';
import { Content } from 'Context/UserContext';
import { SubMenuItem, MenuItem } from 'routes/sitemap';

const routes = (role: string | number) => {
  let result: SubMenuItem[] = [];
  result = privateRoutes.filter((x) => {
    return x.role === role;
  });
  return result;
};

const DrawerItems = () => {
  const value = useContext(Content);
  const subMenu = ['tambah', 'exit', 'edit', "detail"];
  const siteMap: MenuItem[] = [
    ...routes(value?.role || '')
      .filter((y) => {
        return !subMenu.includes(y.id || '');
      })
      .map((x: SubMenuItem) => {
        let result: MenuItem = {
          id: x.id || '',
          subheader: x.name || '',
          path: x.path,
          icon: 'hugeicons:grid-view',
        };
        if (x?.children) {
          result = {
            ...result,
            items: x?.children
              .filter((y) => {
                return !subMenu.includes(y.id || '');
              })
              .map((z: SubMenuItem) => {
                return {
                  name: z.name,
                  path: z.path,
                  pathName: z.id,
                  icon: '',
                };
              }),
          };
        }
        return result;
      }),
  ];
  return (
    <>
      <Stack
        position="sticky"
        top={0}
        pt={4}
        pb={2.5}
        alignItems="center"

        bgcolor="info.lighter"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          <Logo/>
        </ButtonBase>
      </Stack>

      <List component="nav" sx={{ mt: 4, mb: 15, px: 0 }}>
        {siteMap.map((route) =>
          route?.items ? (
            <CollapseListItem key={route.id} {...route} />
          ) : (
            <ListItem key={route.id} {...route} />
          ),
        )}
      </List>
    </>
  );
};

export default DrawerItems;
