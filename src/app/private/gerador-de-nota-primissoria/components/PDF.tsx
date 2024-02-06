
import { ClientData } from '@/@types/clients';

import { maskCEP, maskCPF } from '@/Masks/masks';
import { brlExtenso } from '@/utils/brlExtenso';

import { dateFormat } from '@/utils/dateFormart';
import { dateFormat2 } from '@/utils/dateFormat2';
import { dateWrittenInFull } from '@/utils/dateWrittenInFull';
import { formatCurrency } from '@/utils/formatCurrency';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';

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
},
);

Font.register({
  family: "p22",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/2de57c84bcb4b7ed619061b57e3def6a.ttf",
      fontWeight: 400,
    },
  ]
},
);

const styles = StyleSheet.create({
  page: {
    display: "flex",
    justifyContent: "space-between"
  },

  pageBackground: {
    position: "absolute",
    height: "100vh",
    width: "595px",
  },

  layoutPage: {
    paddingTop: "0",
    paddingHorizontal: "0px",
  },

  layoutContainerNote: {
    padding: "16px",
    border: "3px solid black",
    margin: "30px 40px"
  },

  title: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 600,
  },

  text: {
    fontFamily: "Roboto",
    fontSize: "11px"
  },

  text2: {
    fontFamily: "Roboto",
    fontSize: "11px",
    fontWeight: 600,
  },

  text3: {
    fontFamily: "Roboto",
    fontSize: "11px",
    fontWeight: 600,
    textAlign: "left"
  },
  text4: {
    fontFamily: "p22",
    fontSize: "40px",
    textAlign: "center",
    marginBottom: "-14px",
    marginTop: "6px",
  },
  text5: {
    fontFamily: "Roboto",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: 'row',
    width: "100%",
    gap: "40px",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    alignItems: "center",
  },

  container2: {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    marginTop: "4px"
  }
});

interface PDFprops {
  isModal?: boolean;
  dataModal?: ClientData;
  dataForm?: ClientData;
}

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
          <View style={styles.layoutPage}>
            <Image src="/background.png" style={styles.pageBackground} />
            <View style={styles.layoutContainerNote}>
              <View style={styles.header}>
                <View style={styles.container}>
                  <Text style={styles.title}>NOTA PROMISSÓRIA</Text>
                  <Text style={styles.text2}>Nº#1/001#</Text>
                </View>
                <Text style={styles.text}>Vencimento: {dateFormat2(dataModal?.dueDateNote)}</Text>
              </View>
              <View style={styles.container2}>
                <View style={{ width: "70%" }}>
                </View>
                <View style={{ display: "flex", gap: "1px", flexDirection: "row" }}>
                  <Text style={styles.text3}>R$ {dataModal?.valueParcelNote} </Text>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                <Text style={styles.text}>No dia</Text>
                <Text style={styles.text5}>{dateWrittenInFull(dataModal?.dueDateNote)}</Text>
                <Text style={styles.text}>pagarei por esta única </Text>
                <Text style={styles.text}>via de </Text>
                <Text style={styles.text2}>NOTA PROMISSÓRIA</Text>
                <Text style={styles.text}>a</Text>
                <Text style={styles.text5}>PEDRO A. DE OLIVEIRA JR</Text>
                <Text style={styles.text}>CPF</Text>
                <Text style={styles.text2}>93503610278</Text>
                <Text style={styles.text}>ou á sua ordem a</Text>
                <Text style={styles.text}>quantia de </Text>
                {/**@ts-ignore */}
                <Text style={styles.text5}>{brlExtenso(dataModal?.valueParcelNote)}</Text>
                <Text style={styles.text}>em moeda corrente desse país.</Text>
              </View>
              <View style={{ display: "flex", justifyContent: "space-between", marginTop: "23px", flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Local de pagamento:</Text>
                  <Text style={styles.text2}>{dataModal?.localPaymentNote}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Data de emissão:</Text>
                  <Text style={styles.text2}>{dateFormat(today)}</Text>
                </View>
              </View>
              <View style={{ display: "flex", justifyContent: "space-between", marginTop: "18px", flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Nome do emitente:</Text>
                  <Text style={styles.text2}>{dataModal?.name}</Text>
                </View>
              </View>
              <View style={{ display: "flex", gap: "8px", marginTop: "6px", flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>CPF:</Text>
                  <Text style={styles.text2}>{maskCPF(String(dataModal?.cpf))}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Endereço:</Text>
                  <Text style={styles.text2}>
                    {` ${dataModal?.address}, ${dataModal?.complement}, ${maskCEP(String(dataModal?.cep))}, ${dataModal?.city}, ${dataModal?.state}`}
                  </Text>
                </View>
              </View>
              <View style={{ borderBottom: "1px solid black", width: "100%" }}>
                <Text style={styles.text4}>{dataModal?.name}</Text>
              </View>
              <View>
                <Text style={{ fontFamily: "Roboto", textAlign: "center", fontWeight: 400, fontSize: "11px" }}>
                  Assinatura do Emitente
                </Text>
              </View>
            </View>
          </View>
        </Page>

        <Page size="A4" style={styles.page}>
          <View style={styles.layoutContainerNote}>
            <Text style={styles.text2}>Dados adiconais:</Text>
            <Text style={styles.text}>Telefone: {dataModal?.phone}</Text>
            <Text style={styles.text}>Contato de emergência: {dataModal?.contactEmengency}</Text>
            <Text style={styles.text}>RG: {dataModal?.rg}</Text>
          </View>
        </Page>
      </Document >
    )
  } else {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.layoutPage}>
            <Image src="/background.png" style={styles.pageBackground} />
            <View style={styles.layoutContainerNote}>
              <View style={styles.header}>
                <View style={styles.container}>
                  <Text style={styles.title}>NOTA PROMISSÓRIA</Text>
                  <Text style={styles.text2}>Nº#1/001#</Text>
                </View>
                <Text style={styles.text}>Vencimento: {dateFormat2(dataForm?.dueDateNote)}</Text>
              </View>
              <View style={styles.container2}>
                <View style={{ width: "70%" }}>
                </View>
                <View style={{ display: "flex", gap: "1px", flexDirection: "row" }}>
                  <Text style={styles.text3}>R$ {dataForm?.valueParcelNote} </Text>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                <View style={{ display: "flex", gap: "4px", flexDirection: "row" }}>
                  <Text style={styles.text}>No dia</Text>
                  <Text style={styles.text5}>{dateWrittenInFull(dataForm?.dueDateNote)}</Text>
                  <Text style={styles.text}>pagarei por esta única </Text>
                  <Text style={styles.text}>via de <Text style={styles.text2}>NOTA PROMISSÓRIA</Text></Text>
                  <Text style={styles.text}>a</Text>

                </View>

                <View style={{ display: "flex", gap: "4px", flexDirection: "row" }}>
                  <Text style={styles.text5}>PEDRO A. DE OLIVEIRA JR</Text>
                  <Text style={styles.text}>CPF</Text>
                  <Text style={styles.text2}>93503610278</Text>
                  <Text style={styles.text}>ou á sua ordem a</Text>
                  <Text style={styles.text}>quantia de </Text>
                  <Text style={styles.text5}>{brlExtenso(String(dataForm?.valueParcelNote))} reais</Text>
                </View>

                <View style={{ display: "flex", gap: "4px", flexDirection: "row" }}>

                  <Text style={styles.text}>em moeda corrente desse país.</Text>
                </View>
              </View>
              <View style={{ display: "flex", justifyContent: "space-between", marginTop: "23px", flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Local de pagamento:</Text>
                  <Text style={styles.text2}>{dataForm?.localPaymentNote}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Data de emissão:</Text>
                  <Text style={styles.text2}>{dateFormat(today)}</Text>
                </View>
              </View>
              <View style={{ display: "flex", justifyContent: "space-between", marginTop: "18px", flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Nome do emitente:</Text>
                  <Text style={styles.text2}>{dataForm?.name}</Text>
                </View>
              </View>
              <View style={{ display: "flex", gap: "8px", marginTop: "6px", flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>CPF:</Text>
                  <Text style={styles.text2}>{maskCPF(String(dataForm?.cpf))}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                  <Text style={styles.text}>Endereço:</Text>
                  <Text style={styles.text2}>
                    {` ${dataForm?.address}, ${dataForm?.complement}, ${maskCEP(String(dataForm?.cep))}, ${dataForm?.city}, ${dataForm?.state}`}
                  </Text>
                </View>
              </View>
              <View style={{ borderBottom: "1px solid black", width: "100%" }}>
                <Text style={styles.text4}>{dataForm?.name}</Text>
              </View>
              <View>
                <Text style={{ fontFamily: "Roboto", textAlign: "center", fontWeight: 400, fontSize: "11px" }}>
                  Assinatura do Emitente
                </Text>
              </View>
            </View>
          </View>
        </Page>

        <Page size="A4" style={styles.page}>
          <View style={styles.layoutContainerNote}>
            <Text style={styles.text2}>Dados adicionais:</Text>
            <Text style={styles.text}>Telefone: {dataForm?.phone}</Text>
            <Text style={styles.text}>Contato de emergência: {dataForm?.contactEmengency}</Text>
            <Text style={styles.text}>RG: {dataForm?.rg}</Text>
          </View>
        </Page>
      </Document >
    )
  }
};
