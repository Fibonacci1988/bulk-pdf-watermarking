from flask import Flask
from flask import send_file
from PyPDF2 import PdfFileWriter, PdfFileReader
from reportlab.pdfgen.canvas import Canvas
import os
import glob
import requests
import zipfile

from flask import render_template, request
from werkzeug import secure_filename


app =Flask(__name__)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_files():
   if request.method == 'POST':
      f = request.files['file']
      f.save('files/'+secure_filename(f.filename))
      return 'file uploaded successfully'
		
if __name__ == '__main__':
   app.run(debug = True)





@app.route('/api',methods=['GET','POST'])


def api():
    watermark = 'template/template.pdf'
    watermark_obj = PdfFileReader(watermark)
    watermark_page = watermark_obj.getPage(0)
    for file in os.listdir('files'):
        if '.pdf' in file:
            print(file)
            pdf_reader = PdfFileReader('files/'+file)
            pdf_writer = PdfFileWriter()
        
            # Watermark all the pages
            for page in range(pdf_reader.getNumPages()):
                
                page = pdf_reader.getPage(page)
                page.mergePage(watermark_page)
                pdf_writer.addPage(page)
                
                with open('files/'+file, 'wb') as out:
                    pdf_writer.write(out)

    ziph=zipfile.ZipFile('result/Result.zip','w',zipfile.ZIP_DEFLATED)
    path='files/'
    for root,dirs,files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root,file))
    ziph.close()

    deletionFiles=glob.glob('files/*')
    for f in deletionFiles:
        os.remove(f)
    

    return send_file('result/Result.zip',as_attachment=True)

    
@app.route('/changeWatermarkText', methods = ['GET', 'POST'])
def change_watermark_text():
   
   deletionFiles=glob.glob('template/*')
   for f in deletionFiles:
       os.remove(f)
   
   canvas = Canvas("template/template.pdf")
   canvas.setFont("Times-Roman", 36)
   canvas.drawString(150, 300, "Shyngys Text")
   canvas.save()

   #pdf_reader = PdfFileReader('template/template.pdf')
   #pdf_writer = PdfFileWriter()

   #page = pdf_reader.getPage(0)
   #page.rotateClockwise(315)
   #pdf_writer.addPage(page)
   #pdf_writer.write('template/template2.pdf')


   return 'Watermark changed successfully'

