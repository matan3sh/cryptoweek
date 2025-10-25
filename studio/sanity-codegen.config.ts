import { SanityCodegenConfig } from 'sanity-codegen'

const config: SanityCodegenConfig = {
  schemaPath: './schemas',
  outputPath: '../types/sanity.ts',

  // Generate types with proper naming
  generateTypeName: (name: string) => {
    // Convert kebab-case to PascalCase
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  },
}

export default config
