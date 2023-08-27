import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { IPricing02Props } from 'src/types/pricing';

// ----------------------------------------------------------------------

type Props = {
  plan: IPricing02Props;
};

export default function Pricing02ContentMobile({ plan }: Props) {
  const contentOpen = useBoolean();

  const startLicense = plan.license === 'Start';

  const proLicense = plan.license === 'Pro';

  const businessLicense = plan.license === 'Business';

  return (
    <Stack spacing={5} sx={{ px: 3, pb: 5 }}>
      <div>
        <Link
          variant="subtitle2"
          color={contentOpen.value ? 'primary' : 'inherit'}
          onClick={contentOpen.onToggle}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          {contentOpen.value ? 'Hide' : 'Show'} all feature
          <Iconify
            icon={contentOpen.value ? 'carbon:chevron-up' : 'carbon:chevron-down'}
            sx={{ ml: 1 }}
          />
        </Link>

        <Collapse unmountOnExit in={contentOpen.value}>
          <Stack spacing={2} sx={{ pt: 3 }}>
            {plan.options.map((option) => (
              <Stack
                key={option.title}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="body2"
                  sx={{
                    ...(option.disabled && {
                      color: 'text.disabled',
                    }),
                  }}
                >
                  {option.title}
                </Typography>

                <Iconify
                  icon={option.disabled ? 'carbon:close-outline' : 'carbon:checkmark'}
                  sx={{
                    color: 'primary.main',
                    ...(option.disabled && {
                      color: 'text.disabled',
                    }),
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </Collapse>
      </div>

      <Button
        fullWidth
        size="large"
        variant={proLicense ? 'contained' : 'outlined'}
        color="inherit"
      >
        {startLicense && 'Start Free Trial'}
        {proLicense && 'Choose Pro'}
        {businessLicense && 'Contact Sale'}
      </Button>
    </Stack>
  );
}