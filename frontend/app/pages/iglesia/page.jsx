"use client";
import Main from "@/app/components/Main";
import "./css.css";
import Link from "next/link";

export default function Page() {
	return (
		<Main title="Links de ALETHEIA" className="cont__pages">
			<div className="iglesia">
				<ul>
					<h2>Teatros</h2>
					<h3>Biblia Prohibida - Terminada</h3>
					<li>
						<Link
							target="_blank"
							href="https://drive.google.com/file/d/1efOiKm-axmFExM_qAadOlnnggRIxAAL_/view?usp=sharing"
							title="Guión Literario"
						>
							Guión Literario
						</Link>
					</li>
					<li>
						<Link
							target="_blank"
							href="https://drive.google.com/file/d/1Yc_HF0LR_EEnPshBX1PChYf1t6GvhyTQ/view?usp=sharing"
							title="Guión Técnico"
						>
							Guión Técnico
						</Link>
					</li>
					<h3>10 Pecadores - En Contrucción</h3>
					<li>
						<Link
							target="_blank"
							href="https://docs.google.com/document/d/1cXBsY-doKikwDrx5VFGlbDxglVB0xJ4V/edit?usp=sharing&ouid=111616818681312787104&rtpof=true&sd=true"
							title="Guión Literario"
						>
							Guión Literario
						</Link>
					</li>
					<h2>Documentos</h2>
					<h3>Encuestas</h3>
					<li>
						<Link
							target="_blank"
							href="https://drive.google.com/file/d/1UNdOgtr6Y4W1GSnrcPeFjMStq2UWMO_R/view?usp=sharing"
							title="Para imprimir"
						>
							Para imprimir
						</Link>
					</li>
					<li>
						<Link
							target="_blank"
							href="https://docs.google.com/forms/d/e/1FAIpQLSffV8peICNDKIEIu3QR5RteiGktw4wnl2QWmfGwjUH5BJg_dg/viewform?usp=sharing"
							title="En google forms"
						>
							En google forms
						</Link>
					</li>
					<li>
						<Link
							target="_blank"
							href="https://docs.google.com/spreadsheets/d/1XHC-_S7o-CL0vE7ocR_CplWApu-ATY5jzhd5PNMj4n0/edit?usp=sharing"
							title="En google forms"
						>
							Respuestas
						</Link>
					</li>
					<h3>Ruta de Trabajo</h3>
					<li>
						<Link
							target="_blank"
							href="https://docs.google.com/document/d/15Y4gdFe3zMCd4Y0wr3FSzx_mVCF0r3dj/edit?usp=sharing&ouid=111616818681312787104&rtpof=true&sd=true"
							title="Ministerio"
						>
							Ministerio - En Construcción
						</Link>
					</li>
					<li>
						<Link
							target="_blank"
							href="https://docs.google.com/document/d/14ZQDwwbDJK7Ddhv4f8daciK36xCG0ZSn/edit?usp=sharing&ouid=111616818681312787104&rtpof=true&sd=true"
							title="Campamento"
						>
							Campamento - En Construcción
						</Link>
					</li>
					<h2>Eventos</h2>
					<h3>Tarjetas</h3>
					<li>
						<Link
							target="_blank"
							href="https://drive.google.com/file/d/1-PUvf2If_wxhHsAvkRDf8B4O2sFJ11Ym/view?usp=sharing"
							title="Ministerio"
						>
							Ministerio
						</Link>
					</li>
					<li>
						<Link
							target="_blank"
							href="https://drive.google.com/file/d/1mgn-nM3idr8OLrOAGukmlf5-0hhSc0Ff/view?usp=sharing"
							title="De Ellos para Ellas"
						>
							De Ellos para Ellas
						</Link>
					</li>
				</ul>
			</div>
		</Main>
	);
}
