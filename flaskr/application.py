from flask import Flask, render_template, redirect, url_for, request, jsonify, Blueprint
import hashlib
import os
from werkzeug.utils import secure_filename
from flask import current_app as app
from flask import Flask, Response, request, render_template, redirect, url_for, Blueprint, jsonify
from flaskr.config import *
#
# print("nft_abi: ", nft_abi)
print("nft_address: ", nft_address)

bp = Blueprint('app', __name__)

# app = Flask(__name__, static_url_path='/static')
# app.config['UPLOAD_PATH'] = 'static/uploads/'

@bp.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@bp.route('/metadata', methods=['GET', 'POST'])
def metadata():
    print("metadata loaded")
    if request.method == "POST":
        # file = request.files['file']
        form = request.form
        # if file.filename != '':

        abi_json = json.dumps(nft_abi)

        # nft_address = w3.toChecksumAddress(nft_address)

        nft_contract = w3.eth.contract(
            abi=abi_json,
            address=nft_address
            )

        tokenIds = nft_contract.functions.totalSupply().call()

        # print("tokenIds: ", tokenIds)

        # name, file_extension = os.path.splitext(file.filename)
        # filename = secure_filename(file.filename)
        form_json = json.dumps(form)
        count = json.loads(form_json)['count']
        # print("form_json: ", form_json)
        # print("metadata: ", metadata)
        # print("metadata: ", form_json['count'])
        # count = (int)(metadata["count"])
        # metadata = json.loads(metadata)

        # print(os.path.join(app.config['UPLOAD_PATH'])+'nft/'+(str)(tokenIds)+file_extension)
        # file.seek(0)
        # file.save(os.path.join(app.config['UPLOAD_PATH'])+'nft/'+(str)(tokenIds)+file_extension)
        # print("count: ", count)
        for i in range(tokenIds, tokenIds+(int)(count)):

            print("i :", i)
            with open(app.root_path+'/static/uploads/metadata/'+(str)(i)+'.json', 'w') as f:
                json.dump({
                    'name': "My Freaky Troll #"+ (str)(i+1),
                    'description': "This Freaky Troll is one of the 10,000 purchased on the official Troll Market - myfreakytrolls.io and minted on the Ethereum blockchain (EC 721 Token). This Troll will be revealed live on YouTube and will later be deployed in the “Kingdom of The Trolls Game”( stay tuned on our Twitter for more info and reveal date: @myfreakytrolls ).",
                    'image': request.url_root+'static/uploads/nft/0.png'
                }, f)
        # print("filename: ", filename)
        print("success ")
        status = "success"
    else:
        print("failed")
        status = "uploaded error"
    return json.dumps({'status':status});
