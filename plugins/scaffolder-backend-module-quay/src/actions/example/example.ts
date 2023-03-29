import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

/**
 * Creates an `acme:example` Scaffolder action.
 *
 * @remarks
 *
 * See {@link https://example.com} for more information.
 *
 * @public
 */
export function createOcmCreateAction() {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions
  return createTemplateAction<{
    myParameter: string;
  }>({
    id: 'quay:create',
    description: 'Crates an quay image repository',
    schema: {
      input: {
        type: 'object',
        required: ['myParameter'],
        properties: {
          myParameter: {
            title: 'An example parameter',
            description: 'This is the schema for our example parameter',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      ctx.logger.info(
        `Running example template with parameters: ${ctx.input.myParameter}`,
      );

      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  });
}
