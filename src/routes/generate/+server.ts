import createReport from 'docx-templates';
import fs from 'fs';
import { exec } from 'child_process';
import { isHoliday } from 'feiertagejs';

const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
  "August", "September", "Oktober", "November", "Dezember"];

export async function GET({ url }) {
  const template = fs.readFileSync('template.docx');

  // parse request
  const month = parseInt(url.searchParams.get('month'));
  const year = parseInt(url.searchParams.get('year'));

  // find all workdays in a month
  const dates = [];


  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    const day = date.getDay();
    if (day !== 0 && day !== 6 && day !== 3 && !isHoliday(date, 'NW')) {
      // dates.push({ name: date.toLocaleDateString("de-DE"), fridayXML: day === 5 ? '||<w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="DECFFC" /></w:tcPr>||' : '' });
      dates.push({
        name: date.toLocaleDateString("de-DE"), isCrossedOut: day === 2,
      });
    }
    date.setDate(date.getDate() + 1);
  }

  // get git commit
  const commit: string = await new Promise((resolve, reject) => {
    exec('git rev-parse HEAD', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        reject(error);
        return;
      }
      resolve(stdout);
    })
  });

  const buffer = await createReport({
    template,
    data: {
      dates,
      month: months[month],
      year,
      date: new Date().toLocaleString("de-DE"),
      commit: commit.slice(0, 7)
    },
    cmdDelimiter: ['{', '}'],
    literalXmlDelimiter: '||'
  });
  fs.writeFileSync('output.docx', buffer);

  const converted = await convertToPdf(month, year);
  return new Response(converted.pdfContent, { headers: converted.headers });
}

const convertToPdf = (month: number, year: number): Promise<{ pdfContent: Buffer, headers: HeadersInit }> => {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync('output.pdf');
    } catch (e) {
      console.log(e);
    }

    exec('libreoffice --headless --convert-to pdf output.docx', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        reject(error);
        return;
      }

      const pdfContent = fs.readFileSync('output.pdf');

      resolve({
        pdfContent,
        headers: {
          'content-type': 'application/pdf',
          'content-disposition': `attachment; filename="Arbeitszeiten_${months[month]}_${year}.pdf"`
        },
      });
    });
  });
};
