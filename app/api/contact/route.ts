import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  const body = await request.json()
  const { name, phone, service, date, time, message } = body

  try {
    await resend.emails.send({
      from: 'A&I Clean <onboarding@resend.dev>',
      to: ['gononivann82@gmail.com', 'elhadiayman03@gmail.com'],
      subject: `🚗 Nouvelle réservation — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0e16; color: #f1f5f9; padding: 32px; border-radius: 16px;">
          <h2 style="color: #3b82f6; margin-top: 0;">🚗 Nouvelle demande de réservation — A&amp;I Clean</h2>
          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; border: 1px solid rgba(255,255,255,0.1);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Nom</td>
                <td style="padding: 8px 0; font-weight: bold; color: #f1f5f9;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Téléphone</td>
                <td style="padding: 8px 0; color: #f1f5f9;"><a href="tel:${phone?.replace(/\s/g, '')}" style="color: #3b82f6;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Prestation</td>
                <td style="padding: 8px 0; color: #f1f5f9;">${service || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Date souhaitée</td>
                <td style="padding: 8px 0; color: #60a5fa; font-weight: bold;">${date || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Créneau</td>
                <td style="padding: 8px 0; color: #60a5fa; font-weight: bold;">${time || '—'}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; padding-top: 16px;">Message</td>
                <td style="padding: 8px 0; color: #f1f5f9; padding-top: 16px;">${message}</td>
              </tr>` : ''}
            </table>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 24px; text-align: center;">A&amp;I Clean · Saint-Étienne &amp; Loire</p>
        </div>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
