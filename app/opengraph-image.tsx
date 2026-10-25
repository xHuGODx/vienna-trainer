import { ImageResponse } from "next/og";

export const alt = "Vienna Game Trainer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ alignItems: "center", background: "#101310", color: "#fffaf0", display: "flex", fontFamily: "serif", height: "100%", justifyContent: "center", padding: 68, width: "100%" }}>
      <div style={{ border: "1px solid #30372e", borderRadius: 30, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: 54, width: "100%" }}>
        <div style={{ alignItems: "center", display: "flex", fontFamily: "sans-serif", fontSize: 25, fontWeight: 700, gap: 15 }}><div style={{ alignItems: "center", background: "#c97643", borderRadius: 12, color: "#101310", display: "flex", fontSize: 20, fontWeight: 900, height: 58, justifyContent: "center", width: 58 }}>VG</div><span>Vienna Game Trainer</span></div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ color: "#df8a53", fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Repertório para as brancas</span><div style={{ display: "flex", flexDirection: "column", fontSize: 70, letterSpacing: -3, lineHeight: 1.03, marginTop: 18 }}><span>Domina o Vienna Game,</span><span style={{ color: "#9dae8e", fontStyle: "italic" }}>uma posição de cada vez.</span></div></div>
        <div style={{ color: "#a9afa2", display: "flex", fontFamily: "sans-serif", fontSize: 20, justifyContent: "space-between" }}><span>13 linhas explicadas</span><span>27 posições de treino</span><span>1.e4 e5 2.Nc3</span></div>
      </div>
    </div>, size,
  );
}
