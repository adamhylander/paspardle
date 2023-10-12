import express from 'express';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Paca:<password>@paspardle.99fhdrk.mongodb.net/?retryWrites=true&w=majority";
const router = express.Router();
//const app = express();
//const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: '{yourApiIdentifier}',
  issuerBaseURL: `https://dev-6ss22yul41ik5th8.us.auth0.com/`,
});

// This route doesn't need authentication
router.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
router.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = requiredScopes('read:messages');

router.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: '{https://paspardle-api.com}',
  issuerBaseURL: `https://paspardle.eu.auth0.com/`,
});

export default router;

