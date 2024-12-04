from django.forms import model_to_dict
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from django.conf import settings
import json
import os
from django.contrib.auth.decorators import login_required
from .models import Transaction

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def transaction(req: HttpRequest):
    if req.method == "POST":
        body = json.loads(req.body)
        expense = True
        if body["trType"] == "income":
            expense = False
        transaction = Transaction(
            amount=body["amount"],
            place=body["place"],
            date=body["date"],
            user=req.user,
            expense=expense
        )

        transaction.save()
        return JsonResponse({"transaction": model_to_dict(transaction)})

    transactions = [model_to_dict(transaction) for transaction in req.user.transaction_set.all()]
    return JsonResponse({"transactions": transactions})
