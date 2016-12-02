/**************************************************************************************************************
*	ID-1 - Send Email Review & Approval
*	Mike Linscheid
*/
try{
	if (wfTask == "DPE Complete" && wfStatus == "Complete" ) {
		var emailTemplateName = "CANAL_REVIEW_AND_APPROVAL"
		applicantName = "-NA-"
		conArr = getContactArray();
		for (c in conArr) {
			if (conArr[c]["contactType"] == "Applicant" ) {
				applicantName = conArr[c]["firstName"] + " " + conArr[c]["lastName"]
				break
			}
		}
		
		var eParams = aa.util.newHashtable(); 
		addParameter(eParams, "$$alias$$ ", cap.getCapType().getAlias())
		addParameter(eParams, "$$altId$$",altId)
		addParameter(eParams, "$$applicantName$$", applicantName)
		//addParameter(eParams, "$$status$$", capStatus)
		//addParameter(eParams, "$$userId$$", currentUserID)
		
		DLMemailList = getUserEmailsByTitle("Director of Land Management")
		PAemailList = getUserEmailsByTitle("Permit Administrator")
		
		for (e in DLMemailList) sendNotification(sysFromEmail, DLMemailList[e], "", emailTemplateName, eParams, null)
		for (e in PAemailList) sendNotification(sysFromEmail, PAemailList[e], "", emailTemplateName, eParams, null)
	}
}
catch (err) {
	logDebug("A JavaScript Error occurred: WTUA:CANALS/Occupancy/New/NA: #01: " + err.message);
	logDebug(err.stack)
}		
		
/**************************************************************************************************************
*	ID-2 - Send Email Active
*	Mike Linscheid
*/
try{
	if (wfTask == "Issuance" && wfStatus == "Issued" ) {
		var emailTemplateName = "CANAL_ACTIVE"
		applicantName = "-NA-"
		conArr = getContactArray();
		for (c in conArr) {
			if (conArr[c]["contactType"] == "Applicant" ) {
				applicantName = conArr[c]["firstName"] + " " + conArr[c]["lastName"]
				break
			}
		}
		
		var eParams = aa.util.newHashtable(); 
		addParameter(eParams, "$$alias$$ ", cap.getCapType().getAlias())
		addParameter(eParams, "$$altId$$",altId)
		addParameter(eParams, "$$applicantName$$", applicantName)
		//addParameter(eParams, "$$status$$", capStatus)
		addParameter(eParams, "$$userId$$", currentUserID)
		
		DLMemailList = getUserEmailsByTitle("Director of Land Management")
		PAemailList = getUserEmailsByTitle("Permit Administrator")
		
		for (e in DLMemailList) sendNotification(sysFromEmail, DLMemailList[e], "", emailTemplateName, eParams, null)
		for (e in PAemailList) sendNotification(sysFromEmail, PAemailList[e], "", emailTemplateName, eParams, null)
		
		//Send to WORKFLOW People
		sendNotification(sysFromEmail, getTaskCompletersEmail("Application Entry"), "", emailTemplateName, eParams, null)
		sendNotification(sysFromEmail, getTaskCompletersEmail("DPE Complete"), "", emailTemplateName, eParams, null)
	}
}
catch (err) {
	logDebug("A JavaScript Error occurred: WTUA:CANALS/Occupancy/New/NA: #02: " + err.message);
	logDebug(err.stack)
}

/**************************************************************************************************************
*	ID-4 - Send Email Approved
*	Mike Linscheid
*/
try{
	if (wfTask == "HQ Review" && wfStatus == "Approved" && capStatus == "Active") {
		var emailTemplateName = "CANAL_APPROVED"
		applicantName = "-NA-"
		conArr = getContactArray();
		for (c in conArr) {
			if (conArr[c]["contactType"] == "Applicant" ) {
				applicantName = conArr[c]["firstName"] + " " + conArr[c]["lastName"]
				break
			}
		}
		
		var eParams = aa.util.newHashtable(); 
		addParameter(eParams, "$$alias$$ ", cap.getCapType().getAlias())
		addParameter(eParams, "$$altId$$",altId)
		addParameter(eParams, "$$applicantName$$", applicantName)
		//addParameter(eParams, "$$status$$", capStatus)
		addParameter(eParams, "$$userId$$", currentUserID)
		
		DLMemailList = getUserEmailsByTitle("Director of Land Management")
		PAemailList = getUserEmailsByTitle("Permit Administrator")
		
		for (e in DLMemailList) sendNotification(sysFromEmail, DLMemailList[e], "", emailTemplateName, eParams, null)
		for (e in PAemailList) sendNotification(sysFromEmail, PAemailList[e], "", emailTemplateName, eParams, null)
		
		//Send to WORKFLOW People
		sendNotification(sysFromEmail, getTaskCompletersEmail("Application Entry"), "", emailTemplateName, eParams, null)
		sendNotification(sysFromEmail, getTaskCompletersEmail("DPE Complete"), "", emailTemplateName, eParams, null)
	}
}
catch (err) {
	logDebug("A JavaScript Error occurred: WTUA:CANALS/Occupancy/New/NA: #04: " + err.message);
	logDebug(err.stack)
}
