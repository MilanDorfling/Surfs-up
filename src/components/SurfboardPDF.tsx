"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { SurfboardOrder } from "@/lib/surfboard";
import {
  BOARD_SHAPES,
  BOARD_MATERIALS,
  FIN_SETUPS,
} from "@/lib/surfboard";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#f0f9ff",
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#0369a1",
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#bae6fd",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#0369a1",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#0ea5e9",
    paddingBottom: 4,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: "#64748b",
    width: 140,
    fontFamily: "Helvetica-Bold",
  },
  value: {
    fontSize: 11,
    color: "#0c1e2c",
    flex: 1,
  },
  colorSwatch: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  customBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    padding: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  customText: {
    fontSize: 11,
    color: "#334155",
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 9,
    color: "#94a3b8",
  },
  orderBadge: {
    backgroundColor: "#0ea5e9",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  orderBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
});

interface SurfboardPDFProps {
  order: SurfboardOrder;
  orderNumber: string;
}

export function SurfboardPDF({ order, orderNumber }: SurfboardPDFProps) {
  const shapeLabel =
    BOARD_SHAPES.find((s) => s.value === order.shape)?.label ?? order.shape;
  const materialLabel =
    BOARD_MATERIALS.find((m) => m.value === order.material)?.label ??
    order.material;
  const finLabel =
    FIN_SETUPS.find((f) => f.value === order.fins)?.label ?? order.fins;
  const colorLabel =
    order.color;

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🏄 Surfs Up</Text>
          <Text style={styles.headerSubtitle}>
            Custom Surfboard Order Summary
          </Text>
        </View>

        {/* Order Badge */}
        <View style={styles.orderBadge}>
          <Text style={styles.orderBadgeText}>ORDER #{orderNumber}</Text>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{order.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{order.customerEmail}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
        </View>

        {/* Board Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Board Specifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Shape</Text>
            <Text style={styles.value}>{shapeLabel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Length</Text>
            <Text style={styles.value}>
              {order.lengthFt}&apos;{order.lengthIn}&quot;
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Material</Text>
            <Text style={styles.value}>{materialLabel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fin Setup</Text>
            <Text style={styles.value}>{finLabel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color</Text>
            <Text style={styles.value}>{colorLabel}</Text>
          </View>
        </View>

        {/* Custom Instructions */}
        {order.customInstructions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Instructions</Text>
            <View style={styles.customBox}>
              <Text style={styles.customText}>{order.customInstructions}</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Surfs Up Custom Boards · crafted with love for the ocean
          </Text>
          <Text style={styles.footerText}>{date}</Text>
        </View>
      </Page>
    </Document>
  );
}
