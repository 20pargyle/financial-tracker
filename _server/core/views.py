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
def transactions(req: HttpRequest):
    if req.method == "POST":
        body = json.loads(req.body)
        expense = True if body["trType"] == "expense" else False
        transaction = Transaction(
            amount=body["amount"],
            place=body["place"],
            date=body["date"],
            user=req.user,
            expense=expense
        )

        transaction.save()
        return JsonResponse({"transactions": [model_to_dict(transaction) for transaction in req.user.transaction_set.all()]})

    transactions = [model_to_dict(transaction) for transaction in req.user.transaction_set.all()]
    return JsonResponse({"transactions": transactions})

@login_required
def deleteTransaction(req: HttpRequest, id: int):
    tr = Transaction.objects.get(id=id)
    tr.delete()

    transactions = [model_to_dict(transaction) for transaction in req.user.transaction_set.all()]
    return JsonResponse({"transactions": transactions})

@login_required
def singleTransaction(req: HttpRequest, id: int):
    transaction = Transaction.objects.get(id=id)
    return JsonResponse({"transaction": model_to_dict(transaction)})

@login_required
def monthData(req: HttpRequest):
    monthData = {}
    processedMonths = []

    # alternate approach: go through once to get list of all months in the dataset
    # then search the og dict for each value and add the expenses
    # xres = [ tr['gfg'] for tr in test_list ]

    # return a dictionary of monthly transaction totals
    for transaction in req.user.transaction_set.all():
        month = transaction.date.strftime("%b \'%y")
        # expense or income?
        expenseAmt = transaction.amount * -1 if transaction.expense else transaction.amount
        if month not in processedMonths:
            monthData[month] = expenseAmt
            processedMonths.append(month)
        else:
            monthData[month] += expenseAmt
    
    dataMin = 0
    dataMax = 0
    # Find max / min values in the month totals
    # Used to set the domain of Chart(s)
    for key in monthData:
        if monthData[key] > dataMax:
            dataMax = monthData[key]
        elif monthData[key] < dataMin:
            dataMin = monthData[key]

    dataMin = int(round(dataMin + (dataMin / 10), -1))
    dataMax = int(round(dataMax + (dataMax / 10), -1))

    # TODO: sort by month

    monthDataJson = [{"month": key, "netExpense": round(monthData[key], 2)} for key in monthData]
    return JsonResponse({"monthData": monthDataJson, "dataMin": dataMin, "dataMax": dataMax})


# These will be used for charts that require income and expenses to be seperated
# @login_required
# def monthDataSplit():

#     return JsonResponse({"monthDataIncome": monthDataIncomeJson, "monthDataExpenses": monthDataExpensesJson, "dataMin": dataMin, "dataMax": dataMax})
