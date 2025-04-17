export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order-fix'
  ],
  rules: {
    'declaration-empty-line-before': null,
    'block-no-empty': null,
    'selector-class-pattern': null,
    'plugin/rational-order': [
      true,
      {
        'empty-line-between-groups': true
      }
    ]
  },
};
