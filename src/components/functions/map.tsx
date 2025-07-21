export default function Map() {
  const url = 'https://maps.google.com/maps?q=Russia&z=4&output=embed'

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={url}
        loading="lazy"
        allowFullScreen
        style={{
          border: 0,
        }}
      ></iframe>
    </div>
  )
}
