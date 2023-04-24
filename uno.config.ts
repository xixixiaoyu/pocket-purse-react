import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss';
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx-babel';

export default defineConfig({
  theme: {},
  shortcuts: {
    'pp-btn': 'w-full h-48px rounded-24px text-16px font-bold b-solid b-1',
    'pp-btn-primary':
      'pp-btn bg-[var(--color-primary)] text-white b-transparent',
    'pp-btn-secondary':
      'pp-btn bg-transparent color-[var(--color-primary)] b-[var(--color-primary)]',
    'pp-btn-info': 'pp-btn bg-transparent text-#c0c4cc b-#ddd',
    'pp-page-wrapper': 'flex flex-col h-full',
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  rules: [
    [
      'gradient-primary',
      { background: 'linear-gradient(135deg, #ffefba88 0%, #ffffff 100%)' },
    ],
    [
      'tag-active',
      {
        'border-bottom': '2px solid var(--color-primary)',
        'color': 'var(--color-primary)',
      },
    ],
  ],
  transformers: [transformerAttributifyJsx()],
});
