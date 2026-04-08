# n8n Workflow Automation Integration Guide

**Complete guide to connecting your project to n8n self-hosted instance for workflow automation**

**Time to Setup**: 30 minutes (API) or 45 minutes (API + MCP)

**Reference Project**: N8N-Automations (77 production workflows)

---

## 🎯 What is n8n?

n8n is a **self-hosted workflow automation platform** - the open-source alternative to Zapier.

**Key Features**:
- ✅ **365+ integrations** (OpenAI, Supabase, Discord, Gmail, Stripe, etc.)
- ✅ **Visual workflow builder** (no-code/low-code)
- ✅ **JavaScript/Python code execution** (full programming flexibility)
- ✅ **Self-hosted** (data privacy, no vendor lock-in)
- ✅ **Webhook triggers** (real-time event processing)
- ✅ **Scheduled tasks** (cron-style automation)
- ✅ **API polling** (fetch data on intervals)

**Who Uses n8n**: GitHub, Shopify, Cloudflare, and 50,000+ companies

---

## 🤔 Should You Use n8n?

### **Use n8n when you need** ✅:

- **Complex multi-step automations** (5+ steps)
  - Example: Form submission → AI processing → CRM update → Email → Slack notification

- **Visual workflow builder** (no-code/low-code)
  - Non-technical team members can build workflows
  - Easier to understand than code for complex logic

- **Self-hosted** (data privacy, no vendor lock-in)
  - Keep sensitive data on your infrastructure
  - No monthly subscription costs (beyond hosting)

- **365+ pre-built integrations**
  - OpenAI, Claude, LangChain (AI)
  - Supabase, PostgreSQL, MongoDB (databases)
  - Stripe, PayPal (payments)
  - Discord, Slack, Telegram (communication)
  - Gmail, Outlook, SendGrid (email)
  - Airtable, Google Sheets (data)

- **JavaScript/Python code execution**
  - Full flexibility when integrations aren't enough
  - Custom logic, data transformation, API calls

- **Webhook triggers** (real-time processing)
  - React to events as they happen
  - Example: Stripe payment → n8n workflow → update database + send receipt

---

### **Don't use n8n for** ❌:

- **Simple one-off scripts** (use Node.js directly)
  - Example: One-time data migration → write a script

- **Real-time event streaming** (use message queues instead)
  - Example: Chat messages, game state → use Redis, RabbitMQ, Kafka

- **High-frequency operations** (>1000/min)
  - n8n has rate limits, not designed for extreme scale
  - Example: IoT sensor data every second → use dedicated time-series DB

- **Cloud-only preference** (use Zapier/Make instead)
  - If you don't want to self-host, use cloud alternatives

---

### **Alternatives**:

| Platform | Type | Cost | Best For |
|----------|------|------|----------|
| **Zapier** | Cloud | $20-100/mo | Non-technical users, quick setup |
| **Make.com** | Cloud | $9-29/mo | Visual builder, European alternative |
| **Pipedream** | Cloud | Free-$20/mo | Code-first, generous free tier |
| **Temporal** | Self-hosted | Free (OSS) | Complex orchestration, retries, compensation |

**n8n wins on**: Self-hosting, data privacy, no subscription costs, full control

---

## 📦 Two Integration Methods

n8n provides **two ways** to integrate with your project:

### **Method 1: API Access** (Recommended for Building) ⚡

**Use for**:
- ✅ Building new workflows from scratch
- ✅ Analyzing complex workflow logic
- ✅ Batch operations (update multiple workflows)
- ✅ CI/CD integrations
- ✅ Direct programmatic control

**Pros**:
- ⚡ Fastest (direct HTTP, ~200ms)
- 🔍 Complete visibility (see all code, configurations)
- 💪 Full flexibility (query anything, any way)
- 🚀 Works immediately (no restart)

**Cons**:
- 🛠️ Requires manual API calls
- 📝 More verbose than MCP tools

---

### **Method 2: MCP Server** (Recommended for Management) 🤖

**Use for**:
- ✅ Quick workflow activation/deactivation
- ✅ Conversational management ("activate my email workflow")
- ✅ Non-technical users
- ✅ Simple CRUD operations
- ✅ Integration with other MCP tools

**Pros**:
- 🗣️ Conversational (natural language commands)
- 🔧 8 specialized tools (activate, deactivate, create, etc.)
- 🎯 Simpler for basic operations

**Cons**:
- 🐢 Slower (protocol overhead)
- 🔄 Requires Claude Code restart
- 🚧 Limited to predefined tools

---

**Recommendation**: Use **API for building**, **MCP for management**. Set up both!

---

## 🚀 Quick Start - API Setup

### **Step 1: Get Your n8n Instance**

**Option A: Self-Hosted** (Recommended)
```bash
# Docker (easiest)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Or use docker-compose
version: "3"
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your-password
    volumes:
      - ~/.n8n:/home/node/.n8n
```

**Option B: n8n Cloud** (Paid)
- Visit https://n8n.io/cloud
- 14-day free trial
- $20-50/mo depending on executions

---

### **Step 2: Generate API Key**

1. Open n8n UI (e.g., `https://your-n8n-instance.com`)
2. Go to **Settings** → **API**
3. Click **"Create API Key"**
4. Copy the key (you'll only see it once!)

---

### **Step 3: Configure Environment Variables**

Create `.env.local` in your project:

```bash
# .env.local
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
N8N_BASE_URL=https://your-n8n-instance.com
```

**Security**: Add to `.gitignore`:
```gitignore
.env.local
```

---

### **Step 4: Test Connection**

**Using curl**:
```bash
curl -X GET "$N8N_BASE_URL/api/v1/workflows" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"
```

**Expected response**:
```json
{
  "data": [
    {
      "id": "abc123",
      "name": "My First Workflow",
      "active": false,
      "tags": ["automation"],
      "nodes": [...],
      "connections": {...}
    }
  ]
}
```

**Success**: You're connected! ✅

---

## 🔧 MCP Server Setup (Optional)

### **Step 1: Install Dependencies**

```bash
npm install @modelcontextprotocol/sdk dotenv
```

---

### **Step 2: Create MCP Server File**

Create `mcp-server.js`:

```javascript
#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const N8N_API_KEY = process.env.N8N_API_KEY;
const N8N_BASE_URL = process.env.N8N_BASE_URL;

if (!N8N_API_KEY || !N8N_BASE_URL) {
  throw new Error('Missing N8N_API_KEY or N8N_BASE_URL in .env.local');
}

// Helper function to make n8n API calls
async function n8nAPI(endpoint, method = 'GET', body = null) {
  const url = `${N8N_BASE_URL}/api/v1${endpoint}`;
  const options = {
    method,
    headers: {
      'X-N8N-API-KEY': N8N_API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`n8n API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

const server = new Server(
  {
    name: 'n8n-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define 8 MCP tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_workflows',
        description: 'List all n8n workflows',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'get_workflow',
        description: 'Get workflow details',
        inputSchema: {
          type: 'object',
          properties: {
            workflowId: { type: 'string', description: 'Workflow ID' },
          },
          required: ['workflowId'],
        },
      },
      {
        name: 'activate_workflow',
        description: 'Activate a workflow',
        inputSchema: {
          type: 'object',
          properties: {
            workflowId: { type: 'string' },
          },
          required: ['workflowId'],
        },
      },
      {
        name: 'deactivate_workflow',
        description: 'Deactivate a workflow',
        inputSchema: {
          type: 'object',
          properties: {
            workflowId: { type: 'string' },
          },
          required: ['workflowId'],
        },
      },
      // Add more tools as needed
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'list_workflows':
      const workflows = await n8nAPI('/workflows');
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(workflows, null, 2),
        }],
      };

    case 'get_workflow':
      const workflow = await n8nAPI(`/workflows/${args.workflowId}`);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(workflow, null, 2),
        }],
      };

    case 'activate_workflow':
      await n8nAPI(`/workflows/${args.workflowId}/activate`, 'POST');
      return {
        content: [{
          type: 'text',
          text: `Workflow ${args.workflowId} activated successfully`,
        }],
      };

    case 'deactivate_workflow':
      await n8nAPI(`/workflows/${args.workflowId}/deactivate`, 'POST');
      return {
        content: [{
          type: 'text',
          text: `Workflow ${args.workflowId} deactivated successfully`,
        }],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

**Full implementation**: See `/Users/arnispiekus/Work/Projects/Github/N8N-Automations/mcp-server.js`

---

### **Step 3: Configure Claude Code**

Add to `~/.claude/config.json`:

```json
{
  "mcpServers": {
    "n8n": {
      "command": "node",
      "args": ["/path/to/your/project/mcp-server.js"],
      "env": {
        "N8N_API_KEY": "your-api-key",
        "N8N_BASE_URL": "https://your-n8n-instance.com"
      }
    }
  }
}
```

---

### **Step 4: Restart Claude Code**

MCP servers only load on startup. Restart Claude Code to activate.

**Test**: Ask Claude "List my n8n workflows"

---

## 💡 Use Cases & Patterns

### **1. Webhook Automation (Real Estate Example)**

**Scenario**: Form submission → AI processing → database + email

```javascript
// Next.js API route triggers n8n webhook
// app/api/webhooks/form-submit/route.ts
export async function POST(request: Request) {
  const formData = await request.json();

  // Trigger n8n workflow via webhook
  await fetch(`${process.env.N8N_WEBHOOK_URL}/form-submission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      propertyAddress: formData.address,
      rooms: formData.rooms,
    }),
  });

  return Response.json({ success: true });
}
```

**n8n Workflow**:
```
Webhook Trigger
    ↓
Clean & Validate Data (JavaScript)
    ↓
Calculate Room Count (JavaScript)
    ↓
Supabase: Insert transaction record
    ↓
Generate Signed URL (HMAC-SHA256)
    ↓
Supabase: Update with URL
    ↓
Send Email (Microsoft Outlook / Gmail)
    ↓
Log to CRM (Airtable / HubSpot)
```

**Reference**: KC Family - Seller Questionnaire (77-workflow production system)

---

### **2. Background Job Processing**

**Scenario**: Stripe payment → n8n processes receipt + CRM update

```typescript
// app/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const event = await stripe.webhooks.constructEvent(...);

  if (event.type === 'payment_intent.succeeded') {
    // Trigger n8n: Send receipt + update CRM + log analytics
    await fetch(`${process.env.N8N_BASE_URL}/webhook/payment-success`, {
      method: 'POST',
      body: JSON.stringify({
        customerId: event.data.object.customer,
        amount: event.data.object.amount,
        currency: event.data.object.currency,
      }),
    });
  }

  return Response.json({ received: true });
}
```

---

### **3. AI Workflow Orchestration**

**Scenario**: Document upload → AI processing → structured data extraction

```
File Upload (Supabase Storage)
    ↓
n8n: Trigger on new file
    ↓
Download file
    ↓
OpenAI: Extract structured data
    ↓
Validate with schema (JavaScript)
    ↓
Supabase: Insert parsed data
    ↓
Slack: Notify team of completion
```

---

### **4. Multi-Platform Integrations**

**Scenario**: New blog post → publish to Twitter, LinkedIn, Discord, Slack

```
WordPress: New post published (webhook)
    ↓
n8n: Format for each platform
    ↓
Twitter API: Post tweet
    ↓
LinkedIn API: Create post
    ↓
Discord Webhook: Announce
    ↓
Slack Webhook: Notify team
```

---

### **5. Data Syncing**

**Scenario**: Airtable → Supabase (hourly sync)

```
Schedule Trigger (every hour)
    ↓
Airtable: Fetch updated records
    ↓
Transform data (JavaScript)
    ↓
Supabase: Upsert records
    ↓
Log sync results
```

---

### **6. Email Automation**

**Scenario**: Welcome series (Day 1, Day 3, Day 7 emails)

```
Supabase: New user inserted (trigger)
    ↓
n8n: Create 3 scheduled tasks
    ↓
Wait 1 day → Send email 1
    ↓
Wait 2 days → Send email 2
    ↓
Wait 4 days → Send email 3
```

---

## 🔗 Integration with Resources Boilerplates

### **with-supabase + n8n**

**Pattern**: n8n for background jobs, Supabase for data storage

```typescript
// app/api/webhooks/n8n/route.ts
export async function POST(request: Request) {
  const payload = await request.json();

  // n8n calls this webhook when workflow completes
  const { workflowId, data, status } = payload;

  // Store result in Supabase
  const supabase = createClient();
  await supabase.from('workflow_results').insert({
    workflow_id: workflowId,
    status,
    data,
    completed_at: new Date().toISOString(),
  });

  return Response.json({ success: true });
}
```

**Use Cases**:
- User signs up → n8n sends welcome email + creates CRM contact
- File uploaded to Supabase → n8n processes with AI → saves result
- Scheduled task → n8n fetches data from API → stores in Supabase

---

### **platforms + n8n**

**Pattern**: Multi-tenant workflows (each org has separate n8n workflows)

```typescript
// Trigger workflow per organization
async function triggerWorkflow(orgId: string, data: any) {
  // Each org has their own workflow ID
  const workflow = await getWorkflowForOrg(orgId);

  await fetch(`${process.env.N8N_BASE_URL}/webhook/${workflow.webhookId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orgId, ...data }),
  });
}

// Example: Teacher publishes course → trigger their notification workflow
await triggerWorkflow('teacher-123', {
  event: 'course_published',
  courseId: 'abc',
  courseName: 'Advanced Math',
});
```

---

### **Next.js SaaS Starter + n8n**

**Pattern**: Background job processing with Stripe webhooks

```typescript
// Stripe payment succeeded → trigger n8n workflow
export async function POST(request: Request) {
  const event = await stripe.webhooks.constructEvent(...);

  if (event.type === 'payment_intent.succeeded') {
    // Trigger n8n: Send receipt email + update CRM + log to analytics
    await fetch(`${process.env.N8N_WEBHOOK_URL}/payment-success`, {
      method: 'POST',
      body: JSON.stringify({
        customerId: event.data.object.customer,
        amount: event.data.object.amount,
        teamId: event.data.object.metadata.teamId,
      }),
    });
  }

  return Response.json({ received: true });
}
```

---

## 📚 Available API Endpoints

### **Core Endpoints**:

```bash
# List all workflows
GET /api/v1/workflows

# Get workflow details
GET /api/v1/workflows/:id

# Create workflow
POST /api/v1/workflows
Body: { name, nodes, connections }

# Update workflow
PUT /api/v1/workflows/:id
Body: { name, nodes, connections }

# Delete workflow
DELETE /api/v1/workflows/:id

# Activate workflow
POST /api/v1/workflows/:id/activate

# Deactivate workflow
POST /api/v1/workflows/:id/deactivate

# Execute workflow manually
POST /api/v1/workflows/:id/execute
Body: { data: {...} }

# Get executions
GET /api/v1/executions

# Get execution details
GET /api/v1/executions/:id
```

---

### **Example: Get Workflow with Full Details**

```bash
curl -X GET "$N8N_BASE_URL/api/v1/workflows/abc123" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"
```

**Response** (JavaScript code, Supabase queries, everything):
```json
{
  "data": {
    "id": "abc123",
    "name": "KC Family - Seller Questionnaire",
    "active": false,
    "nodes": [
      {
        "id": "webhook",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "parameters": {
          "path": "form-submission",
          "responseMode": "onReceived"
        }
      },
      {
        "id": "javascript1",
        "name": "Calculate Rooms",
        "type": "n8n-nodes-base.code",
        "parameters": {
          "jsCode": "// Full JavaScript code here...\nconst totalRooms = bedrooms + bathrooms + 3;\nif (hasGarage) totalRooms++;\nreturn { totalRooms };"
        }
      }
    ],
    "connections": {...}
  }
}
```

---

## 🐛 Troubleshooting

### **Issue 1: API Key Not Working**

**Symptoms**: `401 Unauthorized` or `403 Forbidden`

**Solutions**:
```bash
# Check if API key is set
echo $N8N_API_KEY

# Test with curl
curl -X GET "$N8N_BASE_URL/api/v1/workflows" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"

# Regenerate API key in n8n Settings → API
```

---

### **Issue 2: MCP Server Not Appearing**

**Symptoms**: Claude doesn't recognize n8n tools

**Solutions**:
1. Check `~/.claude/config.json` is correct
2. Verify `mcp-server.js` path is absolute
3. **Restart Claude Code** (MCP loads on startup)
4. Test manually: `node mcp-server.js`

---

### **Issue 3: Webhook Not Triggering**

**Symptoms**: n8n workflow doesn't run when webhook called

**Solutions**:
```bash
# Check if workflow is active
curl -X GET "$N8N_BASE_URL/api/v1/workflows/:id" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  | jq '.data.active'

# Activate if needed
curl -X POST "$N8N_BASE_URL/api/v1/workflows/:id/activate" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"

# Check webhook URL format
# Should be: https://your-n8n-instance.com/webhook/your-path
```

---

### **Issue 4: CORS Errors**

**Symptoms**: Browser shows CORS error when calling n8n from frontend

**Solution**: Call n8n from **backend only** (server actions, API routes)

```typescript
// ❌ DON'T: Call from client component
'use client';
export function MyComponent() {
  const handleClick = () => {
    fetch(process.env.N8N_WEBHOOK_URL); // CORS error!
  };
}

// ✅ DO: Call from server action
'use server';
export async function triggerWorkflow() {
  await fetch(process.env.N8N_WEBHOOK_URL);
}
```

---

### **Issue 5: Large Payloads Failing**

**Symptoms**: Workflow fails with `413 Payload Too Large`

**Solutions**:
- Split large data into multiple requests
- Use external storage (S3, Supabase Storage) and pass URLs
- Increase n8n's `N8N_PAYLOAD_SIZE_MAX` env var

---

## 🎯 Quick Reference Commands

### **API Testing**:
```bash
# List workflows
curl -X GET "$N8N_BASE_URL/api/v1/workflows" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"

# Get workflow
curl -X GET "$N8N_BASE_URL/api/v1/workflows/:id" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"

# Trigger webhook
curl -X POST "$N8N_BASE_URL/webhook/your-path" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'

# Activate workflow
curl -X POST "$N8N_BASE_URL/api/v1/workflows/:id/activate" \
  -H "X-N8N-API-KEY: $N8N_API_KEY"
```

---

### **MCP Server**:
```bash
# Test manually
node mcp-server.js

# Check if running
ps aux | grep mcp-server

# Restart Claude Code
# (Required after config changes)
```

---

## 📊 Real-World Example: KC Family Property Intake

**Production system with 77 workflows** handling real estate seller intake.

### **Workflow**: Framer Form → n8n → Supabase → Email

1. **Webhook Trigger**: Receives 30+ fields from Framer form
2. **Clean Data** (JavaScript): Validates and structures data
3. **Calculate Rooms** (JavaScript): Smart counting based on property features
4. **Supabase Insert**: Save questionnaire submission
5. **Generate Signed URL** (HMAC-SHA256): Secure 24-hour upload link
6. **Supabase Update**: Store URL with transaction
7. **Microsoft Outlook**: Send personalized HTML email with photo checklist
8. **Result**: Seller receives email in <5 seconds, 100% automated

**Security**: Military-grade HMAC-SHA256 implementation (pure JavaScript, no dependencies!)

**Reference**: `/Users/arnispiekus/Work/Projects/Github/N8N-Automations/`

---

## 🎓 Learning Resources

### **Official Docs**:
- n8n Documentation: https://docs.n8n.io
- API Reference: https://docs.n8n.io/api
- Node Library: https://docs.n8n.io/integrations/builtin/

### **Community**:
- n8n Forum: https://community.n8n.io
- Discord: https://discord.gg/n8n
- YouTube: https://youtube.com/@n8n

### **Workflow Templates**:
- Community Workflows: https://n8n.io/workflows
- 1,500+ pre-built templates
- Real-world examples

---

## ✅ Setup Checklist

- [ ] n8n instance running (self-hosted or cloud)
- [ ] API key generated
- [ ] `.env.local` configured with `N8N_API_KEY` and `N8N_BASE_URL`
- [ ] API connection tested (`curl` or Postman)
- [ ] (Optional) MCP server file created
- [ ] (Optional) MCP configured in `~/.claude/config.json`
- [ ] (Optional) Claude Code restarted
- [ ] First workflow created and tested

---

## 🚀 Next Steps

1. **Create Your First Workflow**:
   - Use n8n UI visual builder
   - Start with simple webhook → email
   - Test with curl

2. **Integrate with Boilerplate**:
   - Choose pattern above (with-supabase, platforms, etc.)
   - Add webhook endpoint to your app
   - Trigger from server actions

3. **Explore Integrations**:
   - Browse 365+ n8n nodes
   - Connect your tools (Supabase, OpenAI, Stripe)
   - Build complex automations

4. **Scale & Monitor**:
   - Enable execution logging
   - Set up error notifications (Slack, Discord)
   - Monitor workflow performance

---

**Result**: Production-ready workflow automation in 30 minutes with full control over your data.
