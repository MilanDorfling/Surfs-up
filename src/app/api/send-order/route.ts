import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import React, { type JSXElementConstructor, type ReactElement } from "react";
import { SurfboardPDF } from "@/components/SurfboardPDF";
import type { SurfboardOrder } from "@/lib/surfboard";
import { BOARD_SHAPES, BOARD_MATERIALS, FIN_SETUPS } from "@/lib/surfboard";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

function generateOrderNumber(): string {
  return `SU-${Date.now().toString(36).toUpperCase()}`;
}

function buildEmailHTML(order: SurfboardOrder, orderNumber: string): string {
  const shapeLabel =
    BOARD_SHAPES.find((s) => s.value === order.shape)?.label ?? order.shape;
  const materialLabel =
    BOARD_MATERIALS.find((m) => m.value === order.material)?.label ??
    order.material;
  const finLabel =
    FIN_SETUPS.find((f) => f.value === order.fins)?.label ?? order.fins;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f0f9ff; margin: 0; padding: 20px; color: #0c1e2c; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0369a1, #0ea5e9); padding: 32px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .header p { color: #bae6fd; margin: 6px 0 0; font-size: 14px; }
    .body { padding: 28px 32px; }
    .badge { display: inline-block; background: #0ea5e9; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
    .section { margin-bottom: 24px; }
    .section h2 { font-size: 15px; color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 6px; margin-bottom: 12px; }
    .spec-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .spec-row:last-child { border-bottom: none; }
    .spec-label { color: #64748b; font-weight: 500; }
    .spec-value { color: #0c1e2c; font-weight: 600; }
    .custom-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; font-size: 14px; line-height: 1.6; color: #334155; }
    .footer { background: #f8fafc; padding: 16px 32px; text-align: center; font-size: 12px; color: #94a3b8; }
    .attachment-note { background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #065f46; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏄 Surfs Up</h1>
      <p>Your custom surfboard order has been received!</p>
    </div>
    <div class="body">
      <span class="badge">ORDER #${orderNumber}</span>
      <div class="attachment-note">
        📎 Your full board spec sheet is attached as a PDF — keep it for your records!
      </div>
      <div class="section">
        <h2>Customer Details</h2>
        <div class="spec-row"><span class="spec-label">Name</span><span class="spec-value">${order.customerName}</span></div>
        <div class="spec-row"><span class="spec-label">Email</span><span class="spec-value">${order.customerEmail}</span></div>
      </div>
      <div class="section">
        <h2>Board Specifications</h2>
        <div class="spec-row"><span class="spec-label">Shape</span><span class="spec-value">${shapeLabel}</span></div>
        <div class="spec-row"><span class="spec-label">Length</span><span class="spec-value">${order.lengthFt}' ${order.lengthIn}"</span></div>
        <div class="spec-row"><span class="spec-label">Material</span><span class="spec-value">${materialLabel}</span></div>
        <div class="spec-row"><span class="spec-label">Fin Setup</span><span class="spec-value">${finLabel}</span></div>
        <div class="spec-row"><span class="spec-label">Color</span><span class="spec-value">${order.color}</span></div>
      </div>
      ${
        order.customInstructions
          ? `
      <div class="section">
        <h2>Custom Instructions</h2>
        <div class="custom-box">${order.customInstructions.replace(/\n/g, "<br/>")}</div>
      </div>
      `
          : ""
      }
      <p style="font-size:14px;color:#475569;">We'll be in touch shortly to confirm your order and discuss timeline. Stoked to be shaping your new board! 🌊</p>
    </div>
    <div class="footer">Surfs Up Custom Boards · crafted with love for the ocean</div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const body: SurfboardOrder = await request.json();

    // Validate required fields
    if (
      !body.customerName ||
      !body.customerEmail ||
      !body.shape ||
      !body.material ||
      !body.fins
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    // Generate the PDF buffer
    const pdfBuffer = await renderToBuffer(
      React.createElement(SurfboardPDF, { order: body, orderNumber }) as ReactElement<DocumentProps, string | JSXElementConstructor<unknown>>
    );

    const clientEmail = process.env.CLIENT_EMAIL ?? "orders@surfsup.com";

    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "Surfs Up <onboarding@resend.dev>",
      to: [body.customerEmail, clientEmail],
      subject: `🏄 Surfs Up — Custom Board Order #${orderNumber}`,
      html: buildEmailHTML(body, orderNumber),
      attachments: [
        {
          filename: `surfboard-order-${orderNumber}.pdf`,
          content: Buffer.from(pdfBuffer).toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, orderNumber });
  } catch (err) {
    console.error("Send order error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
