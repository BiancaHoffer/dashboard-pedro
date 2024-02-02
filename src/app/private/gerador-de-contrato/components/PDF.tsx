import { ClientData } from '@/@types/clients';

import { maskCEP } from '@/Masks/masks';
import { brlExtenso } from '@/utils/brlExtenso';
import { dateFormat } from '@/utils/dateFormart';
import { dateFormat2 } from '@/utils/dateFormat2';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from '@react-pdf/renderer';

interface PDFprops {
  isModal?: boolean;
  dataModal?: ClientData;
  dataForm?: ClientData;
}

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
      fontWeight: 400,
      fontStyle: "italic",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bolditalic-webfont.ttf",
      fontWeight: 600,
      fontStyle: "italic",
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingVertical: "46px",
    paddingLeft: "32px",
    paddingRight: "32px",
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    textDecoration: "underline",
    fontStyle: "italic",
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center",
    color: "#000000",
    fontFamily: "Roboto",
    textTransform: "uppercase"
  },

  title2: {
    textDecoration: "underline",
    fontStyle: "italic",
    fontSize: "14px",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#000000",
    marginBottom: 16,
    fontFamily: "Roboto"
  },

  containerTables: {
    gap: 16,
    marginBottom: 16,
  },

  table: {
  },

  tableHead: {
    flexDirection: 'row',
  },
  tableItemHead: {
    width: "22%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#ffffff",
    borderStyle: 'solid',
    borderTop: 1,
    borderRight: 1,
    borderLeftWidth: 1,
    borderBottom: 1,
    borderColor: "#000000",
  },
  tableItemHead2: {
    width: "15%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#e7e7e7",
    borderStyle: 'solid',
    borderTop: 1,
    borderLeftWidth: 1,
    borderBottom: 1,
    borderColor: "#000000",
  },
  tableItemHead3: {
    width: "40%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#ffffff",
    borderStyle: 'solid',
    borderTop: 1,
    borderLeftWidth: 1,
    borderBottom: 1,
    borderColor: "#000000",
  },
  tableItemHead4: {
    width: "22%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#ffffff",
    borderStyle: 'solid',
    borderTop: 1,
    borderLeftWidth: 1,
    borderBottom: 1,
    borderColor: "#000000",
  },
  tableItemHead5: {
    width: "50%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#ffff",
    borderStyle: 'solid',
    borderTop: 1,
    borderLeftWidth: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
  },
  tableItemHead7: {
    width: "50%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#e7e7e7",
    borderStyle: 'solid',
    borderTop: 1,
    borderLeftWidth: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
  },
  tableItemHead6: {
    width: "50%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#e7e7e7",
    borderStyle: 'solid',
    borderTop: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
  },
  tableItemHead8: {
    width: "75%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#ffff",
    borderStyle: 'solid',
    borderTop: 1,
    borderBottom: 1,
    borderRight: 1,
    borderLeft: 1,
    borderColor: "#000000",
  },
  tableItemHead9: {
    width: "25%",
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#e7e7e7",
    borderStyle: 'solid',
    borderTop: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
  },
  tableBody: {
    flexDirection: 'row',
  },
  tableItemBody1: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderColor: "#000000",
    width: "15%",
  },
  tableItemBody2: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderColor: "#000000",
    width: "14.8%",
  },
  tableItemBody3: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderColor: "#000000",
    width: "5%",
  },
  tableItemBody4: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
    width: "64%",
  },
  tableItemBody7: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
    width: "20%",
  },
  tableItemBody8: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
    width: "84%",
  },
  tableItemBody5: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000000",
    width: "14.8%",
  },
  tableItemBody6: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderBottom: 1,
    borderRight: 1,
    borderLeft: 1,
    borderColor: "#000000",
    width: "100%",
  },

  textType1: {
    fontStyle: "italic",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  textType2: {
    fontStyle: "italic",
    fontSize: "12px",
    fontWeight: 400,
    fontFamily: "Roboto",
  },
  textType3: {
    fontStyle: "italic",
    fontSize: "10px",
    fontWeight: 400,
    fontFamily: "Roboto",
  },
  textType4: {
    fontStyle: "italic",
    fontSize: "10px",
    fontWeight: 600,
    fontFamily: "Roboto",
  }
});

export function PDF({
  isModal = true,
  dataModal,
  dataForm
}: PDFprops) {
  const today = new Date();

  if (isModal) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <View style={{ marginBottom: 32 }}>
              <Text style={styles.title}>
                TERMO DE RECONHECIMENTO E CONFISSÃO DE DÍVIDA
              </Text>
            </View>
            <View style={styles.containerTables}>
              <View style={styles.table}>
                <View style={styles.tableHead}>
                  <View style={styles.tableItemHead2}>
                    <Text style={styles.textType1}>
                      CREDOR:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead3}>
                    <Text style={styles.textType1}>
                      PEDRO A. DE OLIVEIRA JR
                    </Text>
                  </View>
                  <View style={styles.tableItemHead4}>
                    <Text style={styles.textType2}>
                      NACIONALIDADE:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead}>
                    <Text style={styles.textType1}>
                      BRASILEIRO
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>
                      PROFISSÃO:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      ADVOGADO
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      ESTADO CIVIL:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      CASADO
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      RG:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      22039694
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      CPF:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody5}>
                    <Text style={styles.textType3}>
                      93503610278
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>
                      ENDEREÇO
                    </Text>
                  </View>
                  <View style={styles.tableItemBody8}>
                    <Text style={[styles.textType4, { textTransform: "uppercase" }]}>
                      AV. TANCREDO NEVES, 31, P10, 69054-700, MANAUS, AM.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.tableHead}>
                  <View style={styles.tableItemHead2}>
                    <Text style={styles.textType1}>
                      DEVEDOR:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead3}>
                    <Text style={[styles.textType1, { textTransform: "uppercase" }]}>
                      {dataModal?.name}
                    </Text>
                  </View>
                  <View style={styles.tableItemHead4}>
                    <Text style={styles.textType2}>
                      NACIONALIDADE:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead}>
                    <Text style={[styles.textType1, { textTransform: "uppercase" }]}>
                      {dataModal?.nationality}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>
                      PROFISSÃO:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={[styles.textType3, { textTransform: "uppercase" }]}>
                      {dataModal?.profession}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      ESTADO CIVIL:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={[styles.textType3, { textTransform: "uppercase" }]}>
                      {dataModal?.maritalState?.name}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      RG:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      {dataModal?.rg}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      CPF:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody5}>
                    <Text style={styles.textType3}>
                      {dataModal?.cpf}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>ENDEREÇO</Text>
                  </View>
                  <View style={styles.tableItemBody4}>
                    <Text style={[styles.textType4, { textTransform: "uppercase" }]}>
                      {dataModal?.address},
                      {dataModal?.complement},
                      {maskCEP(String(dataModal?.cep))},
                      {dataModal?.city},
                      {dataModal?.state}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody7}>
                    <Text style={styles.textType4}>{dataModal?.phone}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.textType2}>
                Tem entre si, justo e acordado, o presente termo para o reconhecimento de dívida e negociação de pagamento, que se regerá pelas seguintes cláusulas:
              </Text>
            </View>

            <View>
              <Text style={styles.title2}>CLÁUSULA PRIMEIRA – DO OBJETO.</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <View style={styles.tableItemHead5}>
                  <Text style={styles.textType2}>
                    O <Text style={styles.textType1}>CREDOR</Text> é o titular do crédito no valor de:
                  </Text>
                </View>
                ? <View style={styles.tableItemHead7}>
                  <Text style={styles.textType1}>
                    R$ {dataModal?.valueScheduleContract}
                  </Text>
                </View>
              </View>
              <View style={styles.tableItemBody6}>
                <Text style={styles.textType2}>
                  oriundo de transação comercial efetivada entre os mesmos, o qual o <Text style={styles.textType1}>DEVEDOR</Text> reconhece a
                  dívida e ajusta no presente termo, a forma do devido pagamento.
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 16, marginTop: 16 }}>
              <View>
                <Text style={styles.title2}>CLÁUSULA SEGUNDA – FORMA DE PAGAMENTO.</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableHead}>
                  <View style={styles.tableItemHead8}>
                    <Text style={styles.textType2}>
                      O pagamento da referida dívida, ora reconhecida, será feito á vista, até o dia:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead9}>
                    <Text style={styles.textType1}>
                      {dateFormat(dataModal?.dateFinalScheduleContract)}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableItemBody6}>
                  <Text style={styles.textType2}>
                    na conta bancária em nome do <Text style={styles.textType1}>CREDOR</Text>, ou em outra conta bancária apontada por ele.
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.title2}>CLÁUSULA TERCEIRA – DO DESCUMPRIMENTO.</Text>
            </View>
            <View style={{ marginBottom: 16 }} >
              <Text style={styles.textType2}>O descumprimento deste acordo, ensejará a partir do inadimplemento, juros de mora, acrescido de multa por inadimplemento, legais, sobre o valor da parcela em atraso.</Text>
            </View>
            <View >
              <Text style={styles.title2}>CLÁUSULA TERCEIRA – DO FORO.</Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.textType2}>Para dirimir quaisquer controvérsias oriundas deste pacto as partes elegem o foro da comarca de Manaus, Amazonas. </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.textType2}>E por estarem assim justos e contratados, firmam o presente instrumento em duas vias de igual teor.</Text>
            </View>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.textType1}>Manaus, AM</Text>
            <Text style={styles.textType1}>{dateFormat2(today)}</Text>
          </View>
        </Page>
      </Document>
    )
  } else {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <View style={{ marginBottom: 32 }}>
              <Text style={styles.title}>
                TERMO DE RECONHECIMENTO E CONFISSÃO DE DÍVIDA
              </Text>
            </View>
            <View style={styles.containerTables}>
              <View style={styles.table}>
                <View style={styles.tableHead}>
                  <View style={styles.tableItemHead2}>
                    <Text style={styles.textType1}>
                      CREDOR:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead3}>
                    <Text style={styles.textType1}>
                      PEDRO A. DE OLIVEIRA JR
                    </Text>
                  </View>
                  <View style={styles.tableItemHead4}>
                    <Text style={styles.textType2}>
                      NACIONALIDADE:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead}>
                    <Text style={styles.textType1}>
                      BRASILEIRO
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>
                      PROFISSÃO:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      ADVOGADO
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      ESTADO CIVIL:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      CASADO
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      RG:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      22039694
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      CPF:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody5}>
                    <Text style={styles.textType3}>
                      93503610278
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>
                      ENDEREÇO
                    </Text>
                  </View>
                  <View style={styles.tableItemBody8}>
                    <Text style={[styles.textType4, { textTransform: "uppercase" }]}>
                      AV. TANCREDO NEVES, 31, P10, 69054-700, MANAUS, AM.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.tableHead}>
                  <View style={styles.tableItemHead2}>
                    <Text style={styles.textType1}>
                      DEVEDOR:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead3}>
                    <Text style={[styles.textType1, { textTransform: "uppercase" }]}>
                      {dataForm?.name}
                    </Text>
                  </View>
                  <View style={styles.tableItemHead4}>
                    <Text style={styles.textType2}>
                      NACIONALIDADE:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead}>
                    <Text style={[styles.textType1, { textTransform: "uppercase" }]}>
                      {dataForm?.nationality}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>
                      PROFISSÃO:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={[styles.textType3, { textTransform: "uppercase" }]}>
                      {dataForm?.profession}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      ESTADO CIVIL:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={[styles.textType3, { textTransform: "uppercase" }]}>
                      {dataForm?.maritalState?.name}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      RG:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody2}>
                    <Text style={styles.textType3}>
                      {dataForm?.rg}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody3}>
                    <Text style={styles.textType3}>
                      CPF:
                    </Text>
                  </View>
                  <View style={styles.tableItemBody5}>
                    <Text style={styles.textType3}>
                      {dataForm?.cpf}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableItemBody1}>
                    <Text style={styles.textType3}>ENDEREÇO</Text>
                  </View>
                  <View style={styles.tableItemBody4}>
                    <Text style={[styles.textType4, { textTransform: "uppercase" }]}>
                      {dataForm?.address},
                      {dataForm?.complement},
                      {maskCEP(String(dataForm?.cep))},
                      {dataForm?.city},
                      {dataForm?.state}
                    </Text>
                  </View>
                  <View style={styles.tableItemBody7}>
                    <Text style={styles.textType4}>{dataForm?.phone}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.textType2}>
                Tem entre si, justo e acordado, o presente termo para o reconhecimento de dívida e negociação de pagamento, que se regerá pelas seguintes cláusulas:
              </Text>
            </View>

            <View>
              <Text style={styles.title2}>CLÁUSULA PRIMEIRA – DO OBJETO.</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <View style={styles.tableItemHead5}>
                  <Text style={styles.textType2}>
                    O <Text style={styles.textType1}>CREDOR</Text> é o titular do crédito no valor de:
                  </Text>
                </View>
                ? <View style={styles.tableItemHead7}>
                  <Text style={styles.textType1}>
                    R$ {dataForm?.valueScheduleContract}
                  </Text>
                </View>
              </View>
              <View style={styles.tableItemBody6}>
                <Text style={styles.textType2}>
                  oriundo de transação comercial efetivada entre os mesmos, o qual o <Text style={styles.textType1}>DEVEDOR</Text> reconhece a
                  dívida e ajusta no presente termo, a forma do devido pagamento.
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 16, marginTop: 16 }}>
              <View>
                <Text style={styles.title2}>CLÁUSULA SEGUNDA – FORMA DE PAGAMENTO.</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableHead}>
                  <View style={styles.tableItemHead8}>
                    <Text style={styles.textType2}>
                      O pagamento da referida dívida, ora reconhecida, será feito á vista, até o dia:
                    </Text>
                  </View>
                  <View style={styles.tableItemHead9}>
                    <Text style={styles.textType1}>
                      {dateFormat(dataForm?.dateFinalScheduleContract)}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableItemBody6}>
                  <Text style={styles.textType2}>
                    na conta bancária em nome do <Text style={styles.textType1}>CREDOR</Text>, ou em outra conta bancária apontada por ele.
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.title2}>CLÁUSULA TERCEIRA – DO DESCUMPRIMENTO.</Text>
            </View>
            <View style={{ marginBottom: 16 }} >
              <Text style={styles.textType2}>O descumprimento deste acordo, ensejará a partir do inadimplemento, juros de mora, acrescido de multa por inadimplemento, legais, sobre o valor da parcela em atraso.</Text>
            </View>
            <View >
              <Text style={styles.title2}>CLÁUSULA TERCEIRA – DO FORO.</Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.textType2}>Para dirimir quaisquer controvérsias oriundas deste pacto as partes elegem o foro da comarca de Manaus, Amazonas. </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.textType2}>E por estarem assim justos e contratados, firmam o presente instrumento em duas vias de igual teor.</Text>
            </View>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.textType1}>Manaus, AM</Text>
            <Text style={styles.textType1}>{dateFormat2(today)}</Text>
          </View>
        </Page>
      </Document>
    )
  }
}