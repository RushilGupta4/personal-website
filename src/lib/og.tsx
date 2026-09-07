import { colors } from '@/lib/theme';

/** Shared size for every generated OpenGraph card. */
export const OG_SIZE = {
  width: 1200,
  height: 630
};

export const OG_CONTENT_TYPE = 'image/png';

interface OgCardProps {
  title: string;
  /** Rendered under the rule, separated by dots. Falsy entries are dropped. */
  meta?: (string | undefined | null)[];
  eyebrow?: string;
}

/**
 * Text-only OpenGraph card. Deliberately has no photograph - the card is built
 * from the site's theme colours so it stays readable at any thumbnail size.
 */
export const OgCard = ({ title, meta = [], eyebrow }: OgCardProps) => {
  const parts = meta.filter(Boolean) as string[];
  const titleSize = title.length > 80 ? 56 : title.length > 45 ? 68 : 80;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background.dark,
        backgroundImage: `linear-gradient(135deg, ${colors.background.dark} 0%, ${colors.background.light} 55%, ${colors.primary.dark} 100%)`,
        padding: '80px 90px'
      }}
    >
      {eyebrow && (
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: colors.text.secondary,
            marginBottom: 28
          }}
        >
          {eyebrow}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.15,
          color: colors.text.primary,
          maxWidth: 1000
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          width: 320,
          height: 5,
          borderRadius: 999,
          margin: '44px 0',
          backgroundImage: `linear-gradient(90deg, ${colors.primary.main} 0%, #60a5fa 100%)`
        }}
      />

      {parts.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 32, color: colors.text.secondary }}>
          {parts.map((part, index) => (
            <div key={part} style={{ display: 'flex', alignItems: 'center' }}>
              {index > 0 && (
                <div
                  style={{
                    display: 'flex',
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    margin: '0 22px',
                    backgroundColor: colors.text.disabled
                  }}
                />
              )}
              <div style={{ display: 'flex' }}>{part}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
