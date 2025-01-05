import { useState } from 'react';
import { MenuItem } from 'routes/sitemap';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'components/base/IconifyIcon';
import { useMatches } from 'react-router-dom';
// import { useMatches } from "react-router-dom";
const ListItem = ({ subheader, icon, path }: MenuItem) => {
  const [open, setOpen] = useState(false);
  const matches = useMatches();
  const handleClick = () => {
    setOpen(!open);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectPath: any = matches.find((x) => {
    return x.pathname.includes(path || '');
  })?.pathname;
  const active = selectPath ? true : false;
  return (
    <ListItemButton
      component={Link}
      href={path}
      onClick={handleClick}
      sx={{ mb: 1.5, bgcolor: active ? 'info.main' : null }}
    >
      <ListItemIcon>
        {icon && (
          <IconifyIcon
            icon={icon}
            // fontSize="h4.fontSize"
            sx={{
              color: active ? 'text.primary' : null,
            }}
          />
        )}
      </ListItemIcon>
      <ListItemText
        primary={subheader}
        sx={{
          '& .MuiListItemText-primary': {
            color: active ? 'text.primary' : null,
          },
        }}
      />
    </ListItemButton>
  );
};

export default ListItem;
